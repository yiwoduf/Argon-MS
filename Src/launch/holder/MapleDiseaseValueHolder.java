/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package launch.holder;

import client.stats.DiseaseStats;

public class MapleDiseaseValueHolder {

    public int diseaseid;
    public long startTime;
    public long length;
    public DiseaseStats disease;

    public MapleDiseaseValueHolder(final DiseaseStats disease, final long startTime, final long length) {
	this.disease = disease;
	this.startTime = startTime;
	this.length = length;
    }
}