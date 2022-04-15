/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
package packet.opcode;

import tools.IniFileProcess;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

public enum RecvPacketOpcode {
    //퐁, 클라이언트.
//퐁, 클라이언트.
    PONG(false),
    CHANGE_MEISTER_BILL_MAP(false, 0x102),
    PART_TIME_JOB(false, 0x8F),
    //   SECURITY_PACKET(false, 0x66),
    PERMISSION_REQUEST(false, 0x67),
    CHECK_LOGIN_AUTH_INFO(false, 0x69),
    CLIENT_EXCEPTION_INFO(false, 0x9A),
    WVS_SETUP_STEP(false, 0x9B),
    CHECK_HOTFIX(false),
    // 로그인
    SESSION_CHECK_R(false),
    LOGIN_REQUEST(false),
    SECONDPW_RESULT_R,
    SERVERLIST_REQUEST,
    CHARLIST_REQUEST,
    CHECK_CHAR_NAME,
    CREATE_CHAR(false),
    CLIENT_ERROR,
    DELETE_CHAR(false),
    CHAR_SELECT,
    AUTH_LOGIN_WITH_SPW,
    ONLY_REG_SECOND_PASSWORD,
    REG_SECOND_PASSWORD,
    NEW_CONNECTION(false),
    SET_BURNING_CHAR_R,
    CLIENT_QUIT,
    // 채널
    PLAYER_LOGGEDIN(false),
    REDISPLAY_CHANNEL,
    CHANGE_MAP,
    CHANGE_CHANNEL,
    SET_FREE_JOB,
    ENTER_CASH_SHOP,
    ENTER_ASWAN_FIELD,
    ENTER_ASWAN,
    MOVE_PLAYER(false, 0xAE),
    CANCEL_CHAIR(false, 0xAF),
    USE_CHAIR,
    PSYCHIC_GREP_R,
    ReleasePsychicLock,
    PSYCHIC_ATTACK_R,
    PSYCHIC_DAMAGE_R,
    PSYCHIC_UNKNOWN_R,
    CANCEL_PSYCHIC_GREP_R,
    CLOSE_RANGE_ATTACK,
    RANGED_ATTACK,
    MAGIC_ATTACK,
    PASSIVE_ENERGY,
    TAKE_DAMAGE,
    GENERAL_CHAT,
    CLOSE_CHALKBOARD,
    FACE_EXPRESSION,
    USE_ITEMEFFECT,
    WHEEL_OF_FORTUNE,
    MONSTER_BOOK_COVER,
    NPC_TALK,
    NPC_TALK_MORE,
    NPC_SHOP,
    STORAGE,
    USE_HIRED_MERCHANT,
    QUICK_SLOT,
    MERCH_ITEM_STORE,
    DUEY_ACTION,
    ITEM_SORT,
    ITEM_GATHER,
    ITEM_MOVE,
    USE_ITEM,
    CANCEL_ITEM_EFFECT,
    USE_SUMMON_BAG,
    MOVE_BAG,
    SWITCH_BAG,
    PET_FOOD,
    USE_MOUNT_FOOD,
    USE_SCRIPTED_NPC_ITEM,
    USE_CASH_ITEM,
    USE_EDITIONAL_SCROLL,
    USE_PET_LOOT,
    USE_CATCH_ITEM,
    USE_SKILL_BOOK,
    USE_RETURN_SCROLL,
    USE_MAGNIFY_GLASS,
    USE_UPGRADE_SCROLL,
    USE_STAMP,
    USE_EDITIONAL_STAMP,
    USE_BAG,
    USE_SOUL_SCROLL,
    USE_SOUL_ENCHANTER,
    DISTRIBUTE_AP,
    ROOM_CHANGE,
    DF_COMBO,    
    ZERO_TAG,
    ZERO_ASSIST_END,
    ZERO_WEAPONE,
    ZERO_WEAPON,
    WEAPON_ZERO,
    ZERO_SHOCKWAVE,
    WILL_OF_SOWRD_COMBO,
    AUTO_ASSIGN_AP,
    HEAL_OVER_TIME,
    HEAL_OVER_TIME_FROM_POT,
    DISTRIBUTE_SP,
    SPECIAL_SKILL,
    CANCEL_BUFF,
    SKILL_EFFECT,
    MESO_DROP,
    GIVE_FAME,
    CHARACTER_CARD,
    CHAR_INFO_REQUEST,
    SPAWN_PET,
    REGISTER_PET_BUFF,
    CHANGE_MAP_SPECIAL,
    USE_INNER_PORTAL,
    TROCK_ADD_MAP,
    QUEST_ACTION,
    SKILL_MACRO,
    SUB_SUMMON_ACTION,
    MYSTERY_BOOK,
    REWARD_ITEM,
    MAKER_SKILL,
    USE_TREASUER_CHEST,
    PARTYCHAT,
    WHISPER,
    MESSENGER,
    PLAYER_INTERACTION,
    PARTY_OPERATION,
    DENY_PARTY_REQUEST,
    GUILD_OPERATION,
    DENY_GUILD_REQUEST,
    BUDDYLIST_MODIFY,
    NOTE_ACTION,
    USE_DOOR,
    USE_MECH_DOOR,
    CHANGE_KEYMAP,
    ENTER_MTS,
    ALLIANCE_OPERATION,
    DENY_ALLIANCE_REQUEST,
    ARAN_GAIN_COMBO,
    ARAN_LOSE_COMBO,
    BLESS_OF_DARKNES,
    BBS_OPERATION,
    TRANSFORM_PLAYER,
    MOVE_PET,
    PET_CHAT,
    PET_COMMAND,
    PET_LOOT,
    PET_AUTO_POT,
    MOVE_SUMMON,
    SUMMON_ATTACK,
    DAMAGE_SUMMON,
    SUMMON_SKILL,
    REMOVE_SUMMON,
    MOVE_LIFE,
    AUTO_AGGRO,
    FRIENDLY_DAMAGE,
    MONSTER_BOMB,
    HYPNOTIZE_DMG,
    NPC_ACTION,
    ITEM_PICKUP,
    DAMAGE_REACTOR,
    CS_UPDATE,
    BUY_CS_ITEM,
    COUPON_CODE,
    MOVE_DRAGON,
    USE_SPECIAL_SCROLL,
    USE_EQUIP_SCROLL,
    USE_POTENTIAL_SCROLL,
    USE_MAGNIFYING_GLASS,
    USE_REBIRTH_SCROLL,
    USE_MEMORIAL_CUBE,
    USE_SILVER_KARMA,
    GOLDEN_HAMMER,
    HAMMER_EFFECT,
    EQUIPPED_SKILL,
    STEEL_SKILL,
    STEEL_SKILL_CHECK,
    HEAD_TITLE,
    START_GATHER,
    END_GATHER,
    ITEMPOT_PUT(false, 0xFFFFF),
    ITEMPOT_REMOVE(false, 0xFFFFF),
    ITEMPOT_FEED(false, 0xFFFFF),
    ITEMPOT_CURE(false, 0xFFFFF),
    PROFESSIONINFO_REQUEST,
    PROFESSION_MAKE,
    PROFESSION_MAKE_EFFECT,
    PROFESSION_MAKE_SOMETHING,
    SPAWN_EXTRACTOR, EXPEDITION_OPERATION,
    USE_RECIPE,
    NEW_CONNECT,
    INNER_CIRCULATOR,
    VOYD_PRESSURE,
    MOVE_ANDROID,
    ANDROID_FACE_EXPRESSION,
    AGI_BUFF,
    MAGNETIC_DAMAGE,
    REQUEST_ASWAN_DEAD,
    FOLLOW_REQUEST,
    FOLLOW_REPLY,
    WARP_TO_STARPLANET,
    RETRACE_MECH,
    SHOW_SOULEFFECT_R,
    ZERO_WEAPONINFO,
    ZERO_UPGRADE,
    FINAL_ATTACK_REQUEST,
    ZERO_CHAT,
    USE_BLACK_CUBE,
    ZERO_CLOTHES,
    ZERO_SCROLL,
    ZERO_SCROLL_START,
    MAPLE_GUIDE,
    MAPLE_CONTENT_MAP,
    ARROW_FLATTER_ACTION,
    ORBITAL_FLAME,
    MIST_SKILL,
    DMG_FLAME,
    MOVE_GRENADE,
    DUEY_HANDLER,
    MAPLE_CHAT,
    INNER_CHANGE,
    ENTER_CREATE_CHAR,
    HOLLY,
    DRESS_UP,
    AUCTION,
    RUNE_TOUCH,
    RUNE_USE,
    EQUIP_UPGRADE_SYSTEM,
    PROCESS_CHECK(false, 0x23F),
    STAR_PLANET_RANK,
    COMBAT_ANALYZE,
    CheckReincarnation,
    OnOpenGateClose,
    CreateKinesisPsychicArea,
    DoActivePsychicArea,
    DebuffPsychicArea,
    UserDamageSkinSaveRequest,
    LINK_SKILL,
    MemoInGameRequest,
    ObtacleAtomCollision,
    NAME_CHANGE_CUPON,
    NAME_CHANGE,
    GAME_END,
    TEST;

    private short value;
    private boolean checkState;
    private final static Map<Short, RecvPacketOpcode> RecvOpcodes = new HashMap<Short, RecvPacketOpcode>();
    private static boolean loaded = false;

    public static void initalized() {
        if (!RecvOpcodes.isEmpty()) {
            RecvOpcodes.clear();
        }
        for (RecvPacketOpcode recv : RecvPacketOpcode.values()) {
            RecvOpcodes.put(recv.getValue(), recv);
        }
    }

    public static Map<Short, RecvPacketOpcode> getRecvOpcodes() {
        return RecvOpcodes;
    }

    public static void loadOpcode() {
        try {
            IniFileProcess storage = new IniFileProcess(new File("property/Packet/RecvPacket.ini"));
            for (RecvPacketOpcode packet : RecvPacketOpcode.values()) {
                if (packet.getValue() != 0) {
                    continue;
                }

                short value = -2;
                try {
                    if (storage.getString("Receive", packet.name()) != null) {
                        value = Short.parseShort(storage.getString("Receive", packet.name()));
                    }
                } catch (NumberFormatException error) {
                }
                packet.setValue(value);
            }
        } catch (Exception error) {
            error.printStackTrace();
        } finally {
            initalized();
        }
    }

    private RecvPacketOpcode() {
        this.checkState = true;
    }

    private RecvPacketOpcode(boolean state) {
        this.checkState = state;
    }

    private RecvPacketOpcode(boolean state, int op) {
        this.checkState = state;
        setValue((short) op);
    }

    public void setValue(short value) {
        this.value = value;
    }

    public short getValue() {
        return value;
    }
    
    public static void reloadOpcode() {
        loaded = false;
        loadOpcode();
    }

    public static String getOpcodeName(int value) {

        for (RecvPacketOpcode opcode : values()) {
            if (opcode.getValue() == value) {
                return opcode.name();
            }
        }
        return "UNKNOWN";
    }

    public boolean isNeedChecking() {
        return checkState;
    }
}
