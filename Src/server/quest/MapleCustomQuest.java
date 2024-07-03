/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.quest;

import constants.ServerConstants;
import java.io.ByteArrayInputStream;
import java.io.ObjectInputStream;
import java.sql.Blob;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;
import database.MYSQL;
import java.sql.Connection;

public class MapleCustomQuest extends MapleQuest{


    public MapleCustomQuest(int id) {
	try {
	    this.id = id;
	    startActs = new LinkedList<MapleQuestAction>();
	    completeActs = new LinkedList<MapleQuestAction>();
	    startReqs = new LinkedList<MapleQuestRequirement>();
	    completeReqs = new LinkedList<MapleQuestRequirement>();
            Connection con = MYSQL.getConnection();
	    PreparedStatement ps = con.prepareStatement("SELECT * FROM questrequirements WHERE questid = ?");
	    ps.setInt(1, id);
	    ResultSet rs = ps.executeQuery();
	    MapleQuestRequirement req;
	    MapleCustomQuestData data;
	    while (rs.next()) {
		Blob blob = rs.getBlob("data");
		ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(blob.getBytes(1, (int) blob.length())));
		data = (MapleCustomQuestData) ois.readObject();
		req = new MapleQuestRequirement(this, MapleQuestRequirementType.getByWZName(data.getName()), data);
		final byte status = rs.getByte("status");
		if (status == 0) {
		    startReqs.add(req);
		} else if (status == 1) {
		    completeReqs.add(req);
		}
	    }
	    rs.close();
	    ps.close();

	    ps = con.prepareStatement("SELECT * FROM questactions WHERE questid = ?");
	    ps.setInt(1, id);
	    rs = ps.executeQuery();
	    MapleQuestAction act;
	    while (rs.next()) {
		Blob blob = rs.getBlob("data");
		ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(blob.getBytes(1, (int) blob.length())));
		data = (MapleCustomQuestData) ois.readObject();
		act = new MapleQuestAction(MapleQuestActionType.getByWZName(data.getName()), data, this);
		final byte status = rs.getByte("status");
		if (status == 0) {
		    startActs.add(act);
		} else if (status == 1) {
		    completeActs.add(act);
		}
	    }
	    rs.close();
	    ps.close();
            con.close();
	} catch (Exception ex) {
	    if (!ServerConstants.realese) ex.printStackTrace();
	    System.err.println("Error loading custom quest from SQL." + ex);
	}
    }
}
