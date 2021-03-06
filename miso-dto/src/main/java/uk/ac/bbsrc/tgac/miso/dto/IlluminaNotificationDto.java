package uk.ac.bbsrc.tgac.miso.dto;

import uk.ac.bbsrc.tgac.miso.core.data.IlluminaChemistry;
import uk.ac.bbsrc.tgac.miso.core.data.SequencingParameters;
import uk.ac.bbsrc.tgac.miso.core.data.type.PlatformType;

public class IlluminaNotificationDto extends NotificationDto {

  private int callCycle;
  private IlluminaChemistry chemistry;
  private int imgCycle;
  private int numCycles;
  private int readLength;
  private int scoreCycle;


  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (!super.equals(obj)) return false;
    if (getClass() != obj.getClass()) return false;
    IlluminaNotificationDto other = (IlluminaNotificationDto) obj;
    if (callCycle != other.callCycle) return false;
    if (chemistry != other.chemistry) return false;
    if (imgCycle != other.imgCycle) return false;
    if (numCycles != other.numCycles) return false;
    if (readLength != other.readLength) return false;
    if (scoreCycle != other.scoreCycle) return false;
    return true;
  }

  public int getCallCycle() {
    return callCycle;
  }

  public IlluminaChemistry getChemistry() {
    return chemistry;
  }

  public int getImgCycle() {
    return imgCycle;
  }

  public int getNumCycles() {
    return numCycles;
  }


  @Override
  public PlatformType getPlatformType() {
    return PlatformType.ILLUMINA;
  }

  public int getReadLength() {
    return readLength;
  }

  public int getScoreCycle() {
    return scoreCycle;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + callCycle;
    result = prime * result + ((chemistry == null) ? 0 : chemistry.hashCode());
    result = prime * result + imgCycle;
    result = prime * result + numCycles;
    result = prime * result + readLength;
    result = prime * result + scoreCycle;
    return result;
  }

  public void setCallCycle(int callCycle) {
    this.callCycle = callCycle;
  }

  public void setChemistry(IlluminaChemistry chemistry) {
    this.chemistry = chemistry;
  }

  public void setImgCycle(int imgCycle) {
    this.imgCycle = imgCycle;
  }

  public void setNumCycles(int numCycles) {
    this.numCycles = numCycles;
  }

  public void setReadLength(int readLength) {
    this.readLength = readLength;
  }

  public void setScoreCycle(int scoreCycle) {
    this.scoreCycle = scoreCycle;
  }

  @Override
  public boolean test(SequencingParameters params) {
    return params.getPlatform().getPlatformType() == PlatformType.ILLUMINA &&
        Math.abs(params.getReadLength() - readLength) < 2 && params.isPaired() == isPairedEndRun() && params.getChemistry() == chemistry;
  }

  @Override
  public String toString() {
    return "IlluminaNotificationDto [callCycle=" + callCycle + ", imgCycle=" + imgCycle + ", numCycles=" + numCycles + ", scoreCycle="
        + scoreCycle + ", chemistry=" + chemistry + ", readLength=" + readLength + ", getRunAlias()=" + getRunAlias()
        + ", getSequencerName()=" + getSequencerName() + ", getContainerSerialNumber()=" + getContainerSerialNumber() + ", getLaneCount()="
        + getLaneCount() + ", getHealthType()=" + getHealthType() + ", getSequencerFolderPath()=" + getSequencerFolderPath()
        + ", isPairedEndRun()=" + isPairedEndRun() + ", getSoftware()=" + getSoftware() + ", getStartDate()=" + getStartDate()
        + ", getCompletionDate()=" + getCompletionDate() + "]";
  }

}
