/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
package client;

import community.*;
import constants.ServerConstants;
import constants.subclasses.ServerType;
import database.MYSQL;
import database.MYSQLException;
import handler.MapleServerHandler;
import handler.admin.AdminToolPacket;
import handler.chat.ChatHandler;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.util.AttributeKey;
import java.io.BufferedOutputStream;
import java.io.EOFException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import launch.CashShopServer;
import launch.ChannelServer;
import launch.LoginServer;
import launch.world.WorldBroadcasting;
import launch.world.WorldCommunity;
import packet.creators.MainPacketCreator;
import packet.crypto.MapleCrypto;
import scripting.NPCScriptManager;
import server.shops.IMapleCharacterShop;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import javax.script.ScriptEngine;
import launch.AdminToolServer;
import org.apache.mina.common.IoSession;
import packet.creators.LoginPacket;
import packet.opcode.RecvPacketOpcode;
import packet.transfer.read.ByteStream;
import packet.transfer.read.ReadingMaple;
import server.life.CharacterCardFactory;
import server.maps.MapleMapObject;
import server.shops.HiredMerchant;
import tools.FileoutputUtil;
import tools.HexTool;
import tools.Pair;
import tools.RandomStream.Randomizer;
import tools.Timer.PingTimer;
import tools.StreamUtil;

public class MapleClient {

    public static final transient byte LOGIN_NOTLOGGEDIN = 0,
            LOGIN_SERVER_TRANSITION = 1,
            LOGIN_LOGGEDIN = 2,
            LOGIN_WAITING = 3,
            CASH_SHOP_TRANSITION = 4,
            LOGIN_CS_LOGGEDIN = 5,
            CHANGE_CHANNEL = 6;
    public static final int DEFAULT_CHARSLOT = 6;
    public static final String CLIENT_KEY = "CLIENT";
    public final static AttributeKey<MapleClient> CLIENTKEY = AttributeKey.valueOf("mapleclient_netty");
    private transient MapleCrypto send, receive;
    //private IoSession session;
    private Channel session;
    private MapleCharacter player;
    private PlayerStats playerstat;
    private int channel = 1, accId = 1, world;
    private boolean loggedIn = false, serverTransition = false;
    private transient Calendar tempban = null;
    private String accountName;
    private transient long lastPong;
    private boolean gm;
    private byte greason = 1, gender = -1;
    private int charslots = DEFAULT_CHARSLOT;
    public transient short loginAttempt = 0;
    public boolean pinged = false, isCS = false, allowLoggin = false;
    private transient List<Integer> allowedChar = new LinkedList<Integer>();
    private transient Set<String> macs = new HashSet<>();
    private transient Map<String, ScriptEngine> engines = new HashMap<String, ScriptEngine>();
    private transient ScheduledFuture<?> idleTask = null;
    private transient String secondPassword, tempIP = "";// To be used only on login
    private boolean usingSecondPassword = false;
    private final transient Lock npc_mutex = new ReentrantLock();
    private int idcode1, idcode2;
    private long lastNpcClick = 0;
    public Timer processTimer;
    private String serial = null;
    private final transient Lock mutex = new ReentrantLock(true);
    private transient Map<Integer, Pair<Short, Short>> charInfo = new LinkedHashMap<>();

    public MapleClient(/*IoSession*/Channel session, MapleCrypto send, MapleCrypto receive) {
        this.session = session;
        this.send = send;
        this.receive = receive;
    }

    public void sendPacket(final byte[] data) {
        if (data == null) {
            return;
        }
        session.writeAndFlush(data);
    }

    public final Lock getLock() {
        return mutex;
    }

    public String getIp() {
        return session.remoteAddress().toString().split(":")[0];
    }

    public final /*IoSession*/ Channel getSession() {
        return session;
    }

    public void send(byte[] p) {
        getSession().writeAndFlush(p);
    }

    public final MapleCrypto getReceiveCrypto() {
        return receive;
    }

    public final MapleCrypto getSendCrypto() {
        return send;
    }

    public void addChrSlot(int i, int id) {
        setChrSlot(id);
    }

    public int getChrSlot() {
        return 40;
    }

    public final void setChrSlot(int id) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET chrslot = ? WHERE id = ?");
            ps.setInt(1, (getChrSlot() + 1));
            ps.setInt(2, id);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.out.println(e);
        }
    }

    public Map<Integer, Integer> getCharacterCard() {
        Map<Integer, Integer> chrcard = new HashMap<Integer, Integer>();
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM charactercard WHERE accountid = ?");
            ps.setInt(1, accId);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                chrcard.put(rs.getInt("position"), rs.getInt("cardid"));
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException e) {
            throw new MYSQLException("error getChrcard", e);
        }
        return chrcard;
    }

    public void setCharacterCard(Map<Integer, Integer> card) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM charactercard WHERE accountid = ?");
            ps.setInt(1, accId);
            ps.executeUpdate();
            ps.close();
            for (Entry<Integer, Integer> cardlist : card.entrySet()) {
                PreparedStatement psu = con.prepareStatement("INSERT INTO charactercard (accountid, cardid, position) VALUES (?, ?, ?)");
                psu.setInt(1, accId);
                psu.setInt(2, cardlist.getValue());
                psu.setInt(3, cardlist.getKey());
                psu.executeUpdate();
                psu.close();
            }
            con.close();
        } catch (SQLException e) {
            throw new MYSQLException("error setChrcard", e);
        }
    }

    public final Lock getNPCLock() {
        return npc_mutex;
    }

    public MapleCharacter getPlayer() {
        return player;
    }

    public PlayerStats getPlayerStat() {
        return playerstat;
    }

    public void setPlayer(MapleCharacter player) {
        this.player = player;
    }

    public void createdChar(final int id) {
        allowedChar.add(id);
    }

    public final boolean login_Auth(final int id) {
        return allowedChar.contains(id);
    }

    public final List<MapleCharacter> loadCharacters() { // TODO make this less costly zZz
        final LinkedList<MapleCharacter> chars = new LinkedList<MapleCharacter>();
        final Map<Integer, CardData> cardss = CharacterCardFactory.getInstance().loadCharacterCards(accId, 0);
        Object localObject2;
        Object localObject3;
        try {
            for (final CharNameAndId cni : loadCharactersInternal()) {
                final MapleCharacter chr = MapleCharacter.loadCharFromDB(cni.id, this, false, cardss);
                chars.add(chr);
                charInfo.put(chr.getId(), new Pair<>(chr.getLevel(), chr.getJob())); // to be used to update charCards
                allowedChar.add(chr.getId());
            }
            Map characterPosition;
            if ((characterPosition = getCharacterPosition(getAccID())).size() > 0) {
                localObject2 = new LinkedList();
                localObject3 = new LinkedList();
                ((List) localObject2).addAll(chars);
                chars.clear();
                Iterator paramInt = characterPosition.values().iterator();
                Object localObject4;
                while (paramInt.hasNext()) {
                    localObject4 = (Integer) paramInt.next();
                    if (this.allowedChar.contains(localObject4)) {
                        MapleCharacter localMapleCharacter = MapleCharacter.loadCharFromDB(((Integer) localObject4).intValue(), this, false, (Map) cardss);
                        chars.add(localMapleCharacter);
                        charInfo.put(localMapleCharacter.getId(), new Pair<>(localMapleCharacter.getLevel(), localMapleCharacter.getJob())); // to be used to update charCards
                        allowedChar.add(localMapleCharacter.getId());
                    }
                }
                chars.addAll((Collection) localObject3);
            }
            for (int i = 0; i < getCharacterPosition(getAccID()).size(); i++) {
                System.out.println(i + 1);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return chars;
    }

    public final void updateCharacterCards(final Map<Integer, Integer> cids) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM `character_cards` WHERE `accid` = ?");
            ps.setInt(1, accId);
            ps.executeUpdate();
            ps.close();

            PreparedStatement psu = con.prepareStatement("INSERT INTO `character_cards` (accid, worldid, characterid, position) VALUES (?, ?, ?, ?)");
            for (final Map.Entry<Integer, Integer> ii : cids.entrySet()) {
                final Pair<Short, Short> info = charInfo.get(ii.getValue()); // charinfo we can use here as characters are already loaded
                if (info == null || ii.getValue() == 0 || !CharacterCardFactory.getInstance().canHaveCard(info.getLeft(), info.getRight())) {
                    continue;
                }
                psu.setInt(1, accId);
                psu.setInt(2, 0);
                psu.setInt(3, ii.getValue());
                psu.setInt(4, ii.getKey()); // position shouldn't matter much, will reset upon login
                psu.executeUpdate();
            }
            psu.close();
        } catch (SQLException sqlE) {
            System.out.println("Failed to update character cards. Reason: " + sqlE.toString());
        }
    }

    public List<String> loadCharacterNames() {
        List<String> chars = new LinkedList<String>();
        for (CharNameAndId cni : loadCharactersInternal()) {
            chars.add(cni.name);
        }
        return chars;
    }

    private List<CharNameAndId> loadCharactersInternal() {
        long t = System.currentTimeMillis();
        List<CharNameAndId> chars = new LinkedList<CharNameAndId>();
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT id, name FROM characters WHERE accountid = ?");
            ps.setInt(1, accId);

            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                chars.add(new CharNameAndId(rs.getString("name"), rs.getInt("id")));
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.err.println("error loading characters internal" + e);
        }
        if (ServerConstants.isLocal) {
            System.out.println("Load Characters Internal time : " + (System.currentTimeMillis() - t) + "ms");
        }
        return chars;
    }

    public boolean isLoggedIn() {
        return loggedIn;
    }

    private Calendar getTempBanCalendar(ResultSet rs) throws SQLException {
        Calendar lTempban = Calendar.getInstance();
        if (rs.getLong("tempban") == 0) { // basically if timestamp in db is 0000-00-00
            lTempban.setTimeInMillis(0);
            return lTempban;
        }
        Calendar today = Calendar.getInstance();
        lTempban.setTimeInMillis(rs.getTimestamp("tempban").getTime());
        if (today.getTimeInMillis() < lTempban.getTimeInMillis()) {
            return lTempban;
        }

        lTempban.setTimeInMillis(0);
        return lTempban;
    }

    public Calendar getTempBanCalendar() {
        return tempban;
    }

    public byte getBanReason() {
        return greason;
    }

    public boolean hasBannedIP() {
        boolean ret = false;
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT COUNT(*) FROM ipbans WHERE ? LIKE CONCAT(ip, '%')");
            ps.setString(1, getIp());
            ResultSet rs = ps.executeQuery();
            rs.next();
            if (rs.getInt(1) > 0) {
                ret = true;
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            System.err.println("Error checking ip bans" + ex);
        }
        return ret;
    }

    public boolean hasSerialBan() {
        boolean r = false;
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM serialbans WHERE serial = ?");
            ps.setString(1, serial);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                r = true;
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return r;
    }

    public void banSerial() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO serialbans VALUES (DEFAULT, ?)");
            ps.setString(1, serial);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public boolean hasBannedMac() {
        if (macs.isEmpty()) {
            return false;
        }
        boolean ret = false;
        int i = 0;
        try {
            Connection con = MYSQL.getConnection();
            StringBuilder sql = new StringBuilder("SELECT COUNT(*) FROM macbans WHERE mac IN (");
            for (i = 0; i < macs.size(); i++) {
                sql.append("?");
                if (i != macs.size() - 1) {
                    sql.append(", ");
                }
            }
            sql.append(")");
            PreparedStatement ps = con.prepareStatement(sql.toString());
            i = 0;
            for (String mac : macs) {
                i++;
                ps.setString(i, mac);
            }
            ResultSet rs = ps.executeQuery();
            rs.next();
            if (rs.getInt(1) > 0) {
                ret = true;
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            System.err.println("Error checking mac bans" + ex);
        }
        return ret;
    }

    private void loadMacsIfNescessary() throws SQLException {
        if (macs.isEmpty()) {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT macs FROM accounts WHERE id = ?");
            ps.setInt(1, accId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                String[] macData = rs.getString("macs").split(", ");
                for (String mac : macData) {
                    if (!mac.equals("")) {
                        macs.add(mac);
                    }
                }
            } else {
                rs.close();
                ps.close();
                con.close();
                throw new RuntimeException("No valid account associated with this client.");
            }
            rs.close();
            ps.close();
            con.close();
        }
    }

    public void banMacs() {
        Connection con = null;
        try {
            loadMacsIfNescessary();
            List<String> filtered = new LinkedList<String>();
            con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT filter FROM macfilters");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                filtered.add(rs.getString("filter"));
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("INSERT INTO macbans (mac) VALUES (?)");
            for (String mac : macs) {
                boolean matched = false;
                for (String filter : filtered) {
                    if (mac.matches(filter)) {
                        matched = true;
                        break;
                    }
                }
                if (!matched) {
                    ps.setString(1, mac);
                    try {
                        ps.executeUpdate();
                    } catch (SQLException e) {
                        // can fail because of UNIQUE key, we dont care
                    }
                }
            }
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.err.println("Error banning MACs" + e);
        }
    }

    /**
     * Returns 0 on success, a state to be used for
     * {@link MaplePacketCreator#getLoginFailed(int)} otherwise.
     *
     * @param success
     * @return The state of the login.
     */
    public int finishLogin() {
        synchronized (MapleClient.class) {
            final byte state = getLoginState();
            if (state > MapleClient.LOGIN_NOTLOGGEDIN && state != MapleClient.LOGIN_WAITING) { // already loggedin
                loggedIn = false;
                return 7;
            }
            updateLoginState(MapleClient.LOGIN_LOGGEDIN, null);
        }
        return 0;
    }

    public void loadAuthData() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT idcode1, idcode2, 2ndpassword, using2ndpassword FROM accounts WHERE id = ?");
            ps.setInt(1, this.accId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                idcode1 = rs.getInt("idcode1");
                idcode2 = rs.getInt("idcode2");
                secondPassword = rs.getString("2ndpassword");
                usingSecondPassword = rs.getByte("using2ndpassword") == 1;
            }
            rs.close();
            ps.close();
            con.close();
        } catch (Exception e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public String getPassword(String login) {
        String password = null;
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE name = ?");
            ps.setString(1, login);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                password = rs.getString("password");
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return password;
    }

    public int login(String login, String pwd, boolean ipMacBanned) {
        int loginok = 5;
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE name = ?");
            ps.setString(1, login);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                final int banned = rs.getInt("banned");
                final String password = rs.getString("password");

                accId = rs.getInt("id");
                secondPassword = rs.getString("2ndpassword");
                gm = rs.getInt("gm") > 0;
                greason = rs.getByte("greason");
                tempban = getTempBanCalendar(rs);
                gender = rs.getByte("gender");
                idcode1 = rs.getInt("idcode1");
                idcode2 = rs.getInt("idcode2");
                usingSecondPassword = rs.getByte("using2ndpassword") == 1;
                ps.close();

                if (banned > 0) {
                    loginok = 3;
                } else {
                    if (banned == -1) {
                        unban();
                    }
                    byte loginstate = getLoginState();
                    if (loginstate > MapleClient.LOGIN_NOTLOGGEDIN) { // already loggedin (이미 로그인 되있습
                        loggedIn = false;
                        loginok = 7;
                    } else if (pwd.equals(password)) {
                        loginok = 0;
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHH");
                        updateLastConnection(sdf.format(Calendar.getInstance().getTime()));
                    } else {
                        loggedIn = false;
                        loginok = 4;
                    }
                }
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.err.println("ERROR" + e);
        }
        return loginok;
    }

    public boolean CheckSecondPassword(String in) {
        boolean allow = false;

        if (in.equals(secondPassword)) {
            allow = true;
        }
        return allow;
    }

    /**
     * Gets the special server IP if the client matches a certain subnet.
     *
     * @param subnetInfo A <code>Properties</code> instance containing all the
     * subnet info.
     * @param clientIPAddress The IP address of the client as a dotted quad.
     * @param channel The requested channel to match with the subnet.
     * @return <code>0.0.0.0</code> if no subnet matched, or the IP if the
     * subnet matched.
     */
    public static String getChannelServerIPFromSubnet(String clientIPAddress, int channel) {
        return ServerConstants.Host;
    }

    private void unban() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET banned = 0 and banreason = '' WHERE id = ?");
            ps.setInt(1, accId);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.err.println("Error while unbanning" + e);
        }
    }

    public byte unban(String charname) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT accountid from characters where name = ?");
            ps.setString(1, charname);

            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                return -1;
            }
            final int accid = rs.getInt(1);
            rs.close();
            ps.close();

            ps = con.prepareStatement("UPDATE accounts SET banned = 0 and banreason = '' WHERE id = ?");
            ps.setInt(1, accid);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.err.println("Error while unbanning" + e);
            return -2;
        }
        return 0;
    }

    public void updateMacs(String macData) {
        macs.addAll(Arrays.asList(macData.split(", ")));
        StringBuilder newMacData = new StringBuilder();
        Iterator<String> iter = macs.iterator();
        while (iter.hasNext()) {
            newMacData.append(iter.next());
            if (iter.hasNext()) {
                newMacData.append(", ");
            }
        }
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET macs = ? WHERE id = ?");
            ps.setString(1, newMacData.toString());
            ps.setInt(2, accId);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.err.println("Error saving MACs" + e);
        }
    }

    public void setAccID(int id) {
        this.accId = id;
    }

    public int getAccID() {
        return this.accId;
    }

    public final void updateLoginState(final int newstate, final String SessionID) { // TODO hide?
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET loggedin = ?, SessionIP = ?, lastlogin = ? WHERE id = ?");
            ps.setInt(1, newstate);
            ps.setString(2, SessionID);
            ps.setTimestamp(3, new Timestamp(System.currentTimeMillis()));
            ps.setInt(4, getAccID());
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.err.println("error updating login state" + e);
        }
        if (newstate == MapleClient.LOGIN_NOTLOGGEDIN || newstate == MapleClient.LOGIN_WAITING) {
            loggedIn = false;
            serverTransition = false;
        } else {
            serverTransition = (newstate == MapleClient.LOGIN_SERVER_TRANSITION || newstate == MapleClient.CHANGE_CHANNEL);
            loggedIn = !serverTransition;
        }
    }

    public final void updateLastConnection(String time) {
        try {
            Connection con = MYSQL.getConnection();

            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET lastconnect = ? WHERE id = ?");
            ps.setString(1, time);
            ps.setInt(2, accId);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public final int getLastConnection() {
        Connection connect = null;
        PreparedStatement query = null;
        ResultSet result = null;
        try {
            connect = MYSQL.getConnection();
            query = connect.prepareStatement("SELECT lastconnect FROM accounts WHERE id = ?");
            query.setInt(1, accId);
            result = query.executeQuery();
            if (result.next()) {
                return Integer.parseInt(result.getString("lastconnect"));
            }
        } catch (SQLException e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        } finally {
            try {
                if (query != null) {
                    query.close();
                }
                if (result != null) {
                    result.close();
                }
                if (connect != null) {
                    connect.close();
                }
            } catch (SQLException e) {
            }
        }
        return 2012010101;
    }

    public final void updateSecondPassword() {
        try {
            final Connection con = MYSQL.getConnection();

            PreparedStatement ps = con.prepareStatement("UPDATE `accounts` SET `2ndpassword` = ?, `using2ndpassword` = ? WHERE id = ?");
            ps.setString(1, secondPassword);
            ps.setByte(2, (byte) (usingSecondPassword ? 1 : 0));
            ps.setInt(3, accId);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.err.println("error updating login state" + e);
        }
    }

    public void updateIDCodes(int id1, int id2) {
        try {
            final Connection con = MYSQL.getConnection();

            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET idcode1 = ?, idcode2 = ? WHERE id = ?");
            ps.setInt(1, id1);
            ps.setInt(2, id2);
            ps.setInt(3, accId);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public boolean isUsing2ndPassword() {
        return usingSecondPassword;
    }

    public int getIDCode1() {
        return idcode1;
    }

    public int getIDCode2() {
        return idcode2;
    }

    public final byte getLoginState() { // TODO hide?
        Connection con = null;
        try {
            con = MYSQL.getConnection();
            PreparedStatement ps;
            ps = con.prepareStatement("SELECT loggedin, lastlogin FROM accounts WHERE id = ?");
            ps.setInt(1, getAccID());
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                ps.close();
                rs.close();
                con.close();
                throw new MYSQLException("Everything sucks 아이디 : " + getAccID());
            }
            byte state = rs.getByte("loggedin");

            if (state == MapleClient.LOGIN_SERVER_TRANSITION || state == MapleClient.CHANGE_CHANNEL) {
                if (rs.getTimestamp("lastlogin").getTime() + 20000 < System.currentTimeMillis()) { // connecting to chanserver timeout
                    state = MapleClient.LOGIN_NOTLOGGEDIN;
                    updateLoginState(state, null);
                }
            }
            rs.close();
            ps.close();
            con.close();
            if (state == MapleClient.LOGIN_LOGGEDIN) {
                loggedIn = true;
            } else {
                loggedIn = false;
            }
            return state;
        } catch (SQLException e) {
            loggedIn = false;
            throw new MYSQLException("error getting login state", e);
        }
    }

    public static int isValidAccount(String name) {
        Connection con = null;
        try {
            PreparedStatement ps;
            con = MYSQL.getConnection();
            ps = con.prepareStatement("SELECT day FROM accounts WHERE name = ?");
            ps.setString(1, name);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                con.close();
                return 0;
            }
            int state = rs.getInt("day");
            rs.close();
            ps.close();
            con.close();
            return state;
        } catch (SQLException e) {
            throw new MYSQLException("쿼리 오류. 사용 가능 일수를 불러올 수 없습니다.", e);
        }
    }

    public final void removalTask() {
        try {
            if (!player.getAllBuffs().isEmpty()) {
                player.cancelAllBuffs_();
            }
            if (!player.getAllDiseases().isEmpty()) {
                player.cancelAllDebuffs();
            }
            if (player.getTrade() != null) {
                MapleUserTrade.cancelTrade(player.getTrade());
            }
            NPCScriptManager.getInstance().dispose(this);

            final IMapleCharacterShop shop = player.getPlayerShop();
            if (shop != null) {
                shop.removeVisitor(player);
                if (shop.isOwner(player)) {
                    shop.setOpen(true);
                }
            }
            if (player.getMap() != null) {
                player.getMap().removePlayer(player);
                deleteSessionIP(getSessionIPAddress());
                SessionIP = null;
            }
            if (player.getEventInstance() != null) {
                player.getEventInstance().playerDisconnected(player);
            }
            this.processTimer.cancel();
        } catch (final Throwable e) {
        }
    }

    public final void disconnect(final boolean RemoveInChannelServer, final boolean fromCS) {
        if (player != null && isLoggedIn()) {
            removalTask();
            player.saveToDB(true, fromCS);
            deleteSessionIP(getSessionIPAddress());
            for (ChannelServer cs : ChannelServer.getAllInstances()) {
                if (cs.constainsMerchant(getAccID())) {
                    cs.saveAllMerchant();
                }
            }
            if (!fromCS) {
                final ChannelServer ch = ChannelServer.getInstance(channel);
                try {
                    if (player.getMessenger() != null) {
                        WorldCommunity.leaveMessenger(player.getMessenger().getId(), new MapleMultiChatCharacter(player));
                        player.setMessenger(null);
                    }
                    if (player.getParty() != null) {
                        final MaplePartyCharacter chrp = new MaplePartyCharacter(player);
                        chrp.setOnline(false);
                        if (player.getParty().getExpedition() != null) {
                            player.getParty().getExpedition().broadcastMessage(MainPacketCreator.updateExpedition(true, player.getParty().getExpedition()));
                        }
                        WorldCommunity.updateParty(player.getParty().getId(), MaplePartyOperation.LOG_ONOFF, chrp);
                    }
                    if (!serverTransition && isLoggedIn()) {
                        WorldBroadcasting.loggedOff(player.getName(), player.getId(), channel, player.getBuddylist().getBuddyIds());
                    } else { // Change channel
                        WorldBroadcasting.loggedOn(player.getName(), player.getId(), channel, player.getBuddylist().getBuddyIds());
                    }
                    if (player.getGuildId() > 0) {
                        ChannelServer.setGuildMemberOnline(player.getMGC(), false, -1);
                    }
                } catch (final Exception e) {
                    if (player != null) {
                        player.setMessenger(null);
                    }
                    if (!ServerConstants.realese) {
                        e.printStackTrace();
                    }
                    System.err.println(getLogMessage(this, "ERROR") + e);
                } finally {
                    if (RemoveInChannelServer && ch != null) {
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHH");
                        updateLastConnection(sdf.format(Calendar.getInstance().getTime()));
                        ch.removePlayer(player);
                        AdminToolServer.broadcastMessage(AdminToolPacket.Info());
                    }
                    player = null;
                }
            } else {
                final CashShopServer cs = CashShopServer.getInstance();
                try {
                    if (player.getParty() != null) {
                        final MaplePartyCharacter chrp = new MaplePartyCharacter(player);
                        chrp.setOnline(false);
                        WorldCommunity.updateParty(player.getParty().getId(), MaplePartyOperation.LOG_ONOFF, chrp);
                    }
                    if (!serverTransition && isLoggedIn()) {
                        WorldBroadcasting.loggedOff(player.getName(), player.getId(), channel, player.getBuddylist().getBuddyIds());
                    } else { // Change channel
                        WorldBroadcasting.loggedOn(player.getName(), player.getId(), channel, player.getBuddylist().getBuddyIds());
                    }
                    if (player.getGuildId() > 0) {
                        ChannelServer.setGuildMemberOnline(player.getMGC(), false, -1);
                    }

                } catch (final Exception e) {
                    player.setMessenger(null);
                    if (!ServerConstants.realese) {
                        e.printStackTrace();
                    }
                    System.err.println(getLogMessage(this, "ERROR") + e);
                } finally {
                    if (RemoveInChannelServer && cs != null) {
                        cs.getPlayerStorage().deregisterPlayer(player);
                    }
                    player = null;
                }
            }
        }
        if (!serverTransition && isLoggedIn()) {
            updateLoginState(MapleClient.LOGIN_NOTLOGGEDIN, null);
        }
        engines.clear();
    }

    public final String getSessionIPAddress() {
        return getIp();
    }

    public final boolean CheckIPAddress() {
        try {
            final Connection con = MYSQL.getConnection();
            final PreparedStatement ps = con.prepareStatement("SELECT SessionIP FROM accounts WHERE id = ?");
            ps.setInt(1, this.accId);
            final ResultSet rs = ps.executeQuery();

            boolean canlogin = false;

            if (rs.next()) {
                final String sessionIP = rs.getString("SessionIP");

                if (sessionIP != null) { // Probably a login proced skipper?
                    canlogin = getSessionIPAddress().equals(sessionIP.split(":")[0]);
                }
            }
            rs.close();
            ps.close();
            con.close();
            return canlogin;
        } catch (final SQLException e) {
            System.out.println("Failed in checking IP address for client.");
        }
        return false;
    }

    public final int getChannel() {
        return channel;
    }

    public final ChannelServer getChannelServer() {
        return ChannelServer.getInstance(channel);
    }

    public final boolean deleteCharacter(final int cid) {
        try {
            final Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT id, guildid, guildrank, name, alliancerank FROM characters WHERE id = ? AND accountid = ?");
            ps.setInt(1, cid);
            ps.setInt(2, accId);
            ResultSet rs = ps.executeQuery();

            if (!rs.next()) {
                rs.close();
                ps.close();
                con.close();
                return false;
            }
            if (rs.getInt("guildid") > 0) { // is in a guild when deleted
                final MapleGuildCharacter mgc = new MapleGuildCharacter(cid, (short) 0, rs.getString("name"), (byte) -1, 0, rs.getInt("guildrank"), rs.getInt("guildid"), false, rs.getInt("alliancerank"));
                LoginServer.getInstance().deleteGuildCharacter(mgc);
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("DELETE FROM characters WHERE id = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM skills WHERE characterid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM hiredmerch WHERE characterid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM mountdata WHERE characterid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM monsterbook WHERE charid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM keyvalue WHERE cid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM keyvalue2 WHERE cid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM inventoryitems WHERE characterid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM `inner_ability_skills` WHERE player_id = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM `inventoryslot` WHERE characterid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM `keymap` WHERE characterid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM `questinfo` WHERE characterid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM `queststatus` WHERE characterid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM `quickslot` WHERE cid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM `skillmacros` WHERE characterid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM `skills_cooldowns` WHERE charid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM `steelskills` WHERE cid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("DELETE FROM `trocklocations` WHERE characterid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();
            con.close();
            return true;
        } catch (final SQLException e) {
            System.err.println("DeleteChar error" + e);
        }
        return false;
    }

    public void setGender(byte i) {
        Connection con = null;
        try {
            con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET gender = ? WHERE id = ?");
            ps.setInt(1, i);
            ps.setInt(2, accId);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public final byte getGender() {
        return gender == -1 ? 0 : gender;
    }

    public final byte getRGender() {
        return gender;
    }

    public final String getSecondPassword() {
        return "    ";
    }

    public final void setSecondPassword(final String secondPassword) {
        this.secondPassword = secondPassword;
        this.usingSecondPassword = secondPassword != null;
        this.updateSecondPassword();
    }

    public final String getAccountName() {
        return accountName;
    }

    public final void setAccountName(final String accountName) {
        this.accountName = accountName;
    }

    public final void setChannel(final int channel) {
        this.channel = channel;
    }

    public final int getWorld() {
        return world;
    }

    public final void setWorld(final int world) {
        this.world = world;
    }

    public final long getLastPong() {
        return lastPong;
    }

    public String getTempIP() {
        return tempIP;
    }

    public final void pongReceived(ReadingMaple slea) {
        lastPong = System.currentTimeMillis();

        if (slea == null) {
            return;
        }

        if (ServerConstants.AHT_VERSION >= 6) {
            String g = getIp();
            if (getPlayer() != null) {
                g += "_" + getPlayer().getName();
            }

            if (slea.available() == 0 || slea.available() < 4) {
                FileoutputUtil.logToFile(FileoutputUtil.AHT_Log, g + ": AHT self-packet checking failed (not enough data).");
                session.close();
                return;
            }

            boolean closeSession = false;

            int ahtVersion = slea.readInt();

            if (ServerConstants.AHT_VERSION > ahtVersion) {
                FileoutputUtil.logToFile(FileoutputUtil.AHT_Log, g + ": Old version of AHT detected. (Version " + ahtVersion + ")");
                session.close();
                return;
            }

            int dwSeed = slea.readInt();
            int dwSeed2 = slea.readInt();
            int dwSeed3 = slea.readInt();

            long dwChk1 = (long) ((slea.readInt() ^ dwSeed) & 0xFFFFFFFFL);
            long dwChk2 = (long) ((slea.readInt() ^ dwSeed2) & 0xFFFFFFFFL);
            long dwChk3 = (long) ((slea.readInt() ^ dwSeed3) & 0xFFFFFFFFL);

            if (dwChk1 != 0xBAADF00DL || dwChk2 != 0xCCCCCCCCL || dwChk3 != 0xDEADC0DEL) {
                FileoutputUtil.logToFile(FileoutputUtil.AHT_Log, g + ": Wrong AHT Hash value, " + dwChk1 + "," + dwChk2 + "," + dwChk3);

                closeSession = true;
            }

            long dAtkBase = slea.readLong();

            if (dAtkBase != 0x3FECCCCCCCCCCCCDL) {
                FileoutputUtil.logToFile(FileoutputUtil.AHT_Log, g + ": Wrong ATK Base: " + dAtkBase);
            }

            long dwCrcVal = (long) ((slea.readInt() ^ dwSeed3) & 0xFFFFFFFFL);

            if (dwCrcVal != ServerConstants.SKILL_FILE_CRC) {
                FileoutputUtil.logToFile(FileoutputUtil.AHT_Log, g + ": Wrong skill hash: [" + dwCrcVal + "]");

                closeSession = true;
            }

            long nErrorCode = (long) ((slea.readInt() ^ dwSeed2) & 0xFFFFFFFFL);

            if (nErrorCode != 0) {
                String strErrorMsg = "";

                switch ((int) nErrorCode) {
                    case 0:
                        strErrorMsg = "NO_ERROR";
                        break;
                    case 1:
                        strErrorMsg = "ERROR_CODE_MEMORY_HASH";
                        break;
                    case 2:
                        strErrorMsg = "ERROR_CODE_TIME_CHECK";
                        break;
                    case 3:
                        strErrorMsg = "ERROR_CODE_MAIN_CHECK";
                        break;
                    case 4:
                        strErrorMsg = "ERROR_CODE_DEBUG_CHECK";
                        break;
                    case 5:
                        strErrorMsg = "ERROR_CODE_AH_HASH";
                        break;
                    case 6:
                        strErrorMsg = "ERROR_CODE_IAT_HASH";
                        break;
                    case 7:
                        strErrorMsg = "ERROR_CODE_WINDOW_CHECK";
                        break;
                    default:
                        strErrorMsg = "UNK_ERROR";
                        break;
                }

                FileoutputUtil.logToFile(FileoutputUtil.AHT_Log, g + ": Detected Hack! [" + strErrorMsg + "(" + nErrorCode + ")]");

                closeSession = true;
            }

            serial = slea.readMapleAsciiString();
            if (hasSerialBan()) {
                FileoutputUtil.logToFile(FileoutputUtil.AHT_Log, g + ": Serial banned! [" + serial + "]");

                closeSession = true;
            }

            if (closeSession) {
                if (getPlayer() != null && getPlayer().isGM()) {
                    return;
                }

                session.close();
            }
        }
    }

    public static final String getLogMessage(final MapleClient cfor, final String message) {
        return getLogMessage(cfor, message, new Object[0]);
    }

    public static final String getLogMessage(final MapleCharacter cfor, final String message) {
        return getLogMessage(cfor == null ? null : cfor.getClient(), message);
    }

    public static final String getLogMessage(final MapleCharacter cfor, final String message, final Object... parms) {
        return getLogMessage(cfor == null ? null : cfor.getClient(), message, parms);
    }

    public static final String getLogMessage(final MapleClient cfor, final String message, final Object... parms) {
        final StringBuilder builder = new StringBuilder();
        if (cfor != null) {
            if (cfor.getPlayer() != null) {
                builder.append("<");
                builder.append(MapleCharacterUtil.makeMapleReadable(cfor.getPlayer().getName()));
                builder.append(" (캐릭터식별코드: ");
                builder.append(cfor.getPlayer().getId());
                builder.append(")> ");
            }
            if (cfor.getAccountName() != null) {
                builder.append("(계정: ");
                builder.append(cfor.getAccountName());
                builder.append(") ");
            }
        }
        builder.append(message);
        int start;
        for (final Object parm : parms) {
            start = builder.indexOf("{}");
            builder.replace(start, start + 2, parm.toString());
        }
        return builder.toString();
    }

    public static final int findAccIdForCharacterName(final String charName) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            ps.setString(1, charName);
            ResultSet rs = ps.executeQuery();

            int ret = -1;
            if (rs.next()) {
                ret = rs.getInt("accountid");
            }
            rs.close();
            ps.close();
            con.close();
            return ret;
        } catch (final SQLException e) {
            System.err.println("findAccIdForCharacterName SQL error");
        }
        return -1;
    }

    public final Set<String> getMacs() {
        return Collections.unmodifiableSet(macs);
    }

    public final boolean isGm() {
        return gm;
    }

    public final void setScriptEngine(final String name, final ScriptEngine e) {
        engines.put(name, e);
    }

    public final void removeScriptEngine(final String name) {
        engines.remove(name);
    }

    public final ScheduledFuture<?> getIdleTask() {
        return idleTask;
    }

    public final void setIdleTask(final ScheduledFuture<?> idleTask) {
        this.idleTask = idleTask;
    }

    public void removeClickedNPC() {
        lastNpcClick = 0;
    }

    protected static final class CharNameAndId {

        public final String name;
        public final int id;

        public CharNameAndId(final String name, final int id) {
            super();
            this.name = name;
            this.id = id;
        }
    }

    public int getCharacterSlots() {
        if (isGm()) {
            return 15;
        }
        if (charslots != DEFAULT_CHARSLOT) {
            return charslots; //save a sql
        }
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM character_slots WHERE accid = ? AND worldid = ?");
            ps.setInt(1, accId);
            ps.setInt(2, world);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                charslots = rs.getInt("charslots");
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO character_slots (accid, worldid, charslots) VALUES (?, ?, ?)");
                psu.setInt(1, accId);
                psu.setInt(2, world);
                psu.setInt(3, charslots);
                psu.executeUpdate();
                psu.close();
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException sqlE) {
            sqlE.printStackTrace();
        }

        return charslots;
    }

    public boolean gainCharacterSlot() {
        if (getCharacterSlots() >= 15) {
            return false;
        }
        charslots++;

        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE character_slots SET charslots = ? WHERE worldid = ? AND accid = ?");
            ps.setInt(1, charslots);
            ps.setInt(2, world);
            ps.setInt(3, accId);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException sqlE) {
            sqlE.printStackTrace();
            return false;
        }
        return true;
    }

    public boolean setBurningCharacter(int accid, int charid) {
        Connection con = null;
        try {
            con = MYSQL.getConnection();
            PreparedStatement ps;
            ps = con.prepareStatement("SELECT * FROM characters WHERE accountid = ? AND id = ?");
            ps.setInt(1, accid);
            ps.setInt(2, charid);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                con.close();
                return false;
            }
            ps = con.prepareStatement("UPDATE characters SET burning = ? WHERE accountid = ? AND id = ?");
            ps.setByte(1, (byte) 1);
            ps.setInt(2, accid);
            ps.setInt(3, charid);
            ps.executeUpdate();
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
        return true;
    }

    public final void sendPing() {
        session.writeAndFlush(LoginPacket.getPing());
        PingTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                sendPing();
            }
        }, 60000); // note: idletime gets added to this too
    }

    public String getSerial() {
        return serial;
    }

    public boolean canClickNPC() {
        return lastNpcClick + 500 < System.currentTimeMillis();
    }

    public void setClickedNPC() {
        lastNpcClick = System.currentTimeMillis();
    }

    public int getNameChangeValue() {
        int a = 0;
        Connection con = null;
        PreparedStatement ps;
        try {
            con = MYSQL.getConnection();
            ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
            ps.setInt(1, accId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                a = rs.getInt("aimkind");
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException ex) {
        }
        return a;
    }

    public final void setNameChangeValue(int value, int id) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET aimkind = ? WHERE id = ?");
            ps.setInt(1, value);
            ps.setInt(2, id);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.out.println(e);
        }
    }

    public final void setCharName(String name, int id) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE characters SET name = ? WHERE id = ?");
            ps.setString(1, name);
            ps.setInt(2, id);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.out.println(e);
        }
    }

    public final Map getCharacterPosition(final int accid) {
        final LinkedHashMap<Integer, Integer> position = new LinkedHashMap<Integer, Integer>();
        try {
            final Connection con = MYSQL.getConnection();
            final PreparedStatement ps = con.prepareStatement("SELECT * FROM `character_position` WHERE `accid` = ?");
            ps.setInt(1, accid);
            final ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                position.put(rs.getInt("position"), rs.getInt("cid"));
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return position;
    }

    public final void updateCharacterPosition(Map t, boolean createdChar) {
        try {
            Connection con = MYSQL.getConnection();
            if (!createdChar) {
                PreparedStatement ps = con.prepareStatement("DELETE FROM `character_position` WHERE `accid` = ?");
                ps.setInt(1, accId);
                ps.executeUpdate();
                ps.close();
            }

            final PreparedStatement ps2 = con.prepareStatement("INSERT INTO `character_position` (accid, cid, position) VALUE (?, ?, ?)");
            Iterator Map2 = t.entrySet().iterator();
            while (Map2.hasNext()) {
                Map.Entry localEntry = (Map.Entry) Map2.next();
                ps2.setInt(1, accId);
                ps2.setInt(2, ((Integer) localEntry.getValue()).intValue());
                ps2.setInt(3, ((Integer) localEntry.getKey()).intValue());
                ps2.executeUpdate();
            }
            ps2.close();
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public static String SessionIP;
    public static String SessionAccountName;

    public String getSessionIP(String ip) {
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            con = MYSQL.getConnection();
            ps = con.prepareStatement("SELECT SessionIP FROM sessionip WHERE SessionIP = ?");
            ps.setString(1, ip);
            rs = ps.executeQuery();
            if (rs.next()) {
                SessionIP = rs.getString("sessionip");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return SessionIP;
    }

    public String getSessionIPAccountName(String ip) {
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            con = MYSQL.getConnection();
            ps = con.prepareStatement("SELECT name FROM sessionip WHERE SessionIP = ?");
            ps.setString(1, ip);
            rs = ps.executeQuery();
            if (rs.next()) {
                SessionAccountName = rs.getString("name");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return SessionAccountName;
    }

    public void InsertSessionIP(String ip, String accountName) {
        Connection con = null;
        PreparedStatement ps = null;
        try {
            con = MYSQL.getConnection();
            ps = con.prepareStatement("INSERT INTO `sessionip` (SessionIP, name) VALUES (?, ?)");
            ps.setString(1, ip);
            ps.setString(2, accountName);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        }
    }

    public void deleteSessionIP(String ip) {
        Connection con = null;
        PreparedStatement ps = null;
        try {
            con = MYSQL.getConnection();
            ps = con.prepareStatement("DELETE FROM sessionip WHERE SessionIP = ?");
            ps.setString(1, ip);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
