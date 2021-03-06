HotTarget.dilution = {
  createUrl : '/miso/rest/librarydilution',
  updateUrl : '/miso/rest/librarydilution/',
  requestConfiguration : function(config, callback) {
    callback(config)
  },
  fixUp : function(lib, errorHandler) {
  },
  createColumns : function(config, create, data) {
    return [
        {
          header : 'Dilution Name',
          data : 'name',
          readOnly : true,
          include : true,
          validator : HotUtils.validator.optionalTextNoSpecialChars,
          unpackAfterSave : true,
          unpack : function(dil, flat, setCellMeta) {
            flat.name = dil.name || null;
          },
          pack : function(dil, flat, errorHandler) {
            dil.name = flat.name;
          }
        
        },
        HotUtils.makeColumnForText('Matrix Barcode',
            !Constants.automaticBarcodes, 'identificationBarcode', {
              validator : HotUtils.validator.optionalTextNoSpecialChars
            }),
        {
          header : 'Library Alias',
          data : 'libraryAlias',
          readOnly : true,
          include : true,
          unpack : function(dil, flat, setCellMeta) {
            flat.libraryAlias = dil.library.alias;
          },
          pack : function(dil, flat, errorHandler) {
          }
        },
        HotUtils.makeColumnForFloat(
            'Conc. (' + Constants.libraryDilutionConcentrationUnits + ')',
            true, 'concentration', true),
        {
          header : 'Creation Date',
          data : 'creationDate',
          type : 'date',
          dateFormat : 'YYYY-MM-DD',
          datePickerConfig : {
            firstDay : 0,
            numberOfMonths : 1
          },
          allowEmpty : false,
          validator : HotUtils.validator.requiredText,
          include : true,
          unpack : function(dil, flat, setCellMeta) {
            flat.creationDate = dil.creationDate;
          },
          pack : function(dil, flat, errorHandler) {
            dil.creationDate = flat.creationDate;
          }
        },
        {
          header : 'Targeted Sequencing',
          data : 'targetedSequencingAlias',
          type : 'dropdown',
          trimDropdown : false,
          source : [],
          validator : HotUtils.validator.permitEmptyDropdown,
          include : Constants.isDetailedSample,
          unpack : function(dil, flat, setCellMeta) {
            flat.targetedSequencingAlias = Utils.array.maybeGetProperty(
                Utils.array.findFirstOrNull(Utils.array
                    .idPredicate(dil.targetedSequencingId),
                    Constants.targetedSequencings), 'alias') || '(None)';
          },
          pack : function(dil, flat, errorHandler) {
            dil.targetedSequencingId = Utils.array
                .maybeGetProperty(
                    Utils.array
                        .findFirstOrNull(
                            function(tarSeq) {
                              return flat.targetedSequencingAlias == tarSeq.alias && tarSeq.kitDescriptorIds
                                  .indexOf(dil.library.kitDescriptorId) != -1;
                            }, Constants.targetedSequencings), 'id');
          },
          depends : '*start', // This is a dummy value that gets this run on
          // table creation only
          update : function(dil, flat, value, setReadOnly, setOptions, setData) {
            setOptions({
              source : [ '(None)' ].concat(Constants.targetedSequencings
                  .filter(
                      function(targetedSequencing) {
                        return targetedSequencing.kitDescriptorIds
                            .indexOf(dil.library.kitDescriptorId) != -1;
                      }).map(Utils.array.getAlias).sort())
            });
          }
        } ];
  },
  
  bulkActions : [
      {
        name : 'Edit',
        action : function(items) {
          window.location = window.location.origin + '/miso/library/dilution/bulk/edit?' + jQuery
              .param({
                ids : items.map(Utils.array.getId).join(',')
              });
        }
      },
      {
        name : 'Pool together',
        title : 'Create one pool from many dilutions',
        action : function(items) {
          window.location = window.location.origin + '/miso/library/dilution/bulk/merge?' + jQuery
              .param({
                ids : items.map(Utils.array.getId).join(',')
              });
        }
      },
      {
        name : 'Pool separately',
        title : 'Create a pool for each dilution',
        action : function(items) {
          window.location = window.location.origin + '/miso/library/dilution/bulk/propagate?' + jQuery
              .param({
                ids : items.map(Utils.array.getId).join(',')
              });
        }
      }, ],

};
