
var k = "#fUI/GuildMark.img/Mark/Pattern/00004001/11#"

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cps = "";
            cps += "#b#eHi #h0##k#n, #k#eWelcome to Argon Market!\r\nWhat are you looking for?\r\n\r\n";
            cps += "#L100000##e#r"+k+"Warrior#k#n";
            cps += "#L100001##e#r"+k+"Magician#k#n";
            cps += "#L100002##e#r"+k+"Archer#k#n";
            cps += "#L100003##e#r"+k+"Thief#k#n";
            cps += "#L100004##e#r"+k+"Pirate#k#n";
            cps += "  #L444447##e#r"+k+"Kinesis#k#n";
            cps += "   #L444448##e#r"+k+"Blaster#k#n";
            cps += "#L123123##e#r"+k+"Sub#k#n#l\r\n\r\n";
            cps += "#L61##e#b"+k+"Tempest#k#n";
            cps += "#L62##e#b"+k+"Cygnus#k#n";
            cps += "#L63##e#b"+k+"Tyrant#k#n";
            cps += "#L64##e#b"+k+"RTA#k#n#l\r\n\r\n";
            cps += "#L68##e#d"+k+"UseItem#k#n";
            cps += "#L100006##e#d"+k+"Acc#k#n";
            cps += " #L75##e#d"+k+"update#k#n";
            cps +=" #L100007##e#d"+k+"Emblem#k#n";

            cm.sendSimple(cps);
	} else if (selection >= 444447) {
		cm.openShop(selection);
		cm.dispose();   
	} else if (selection == 123123) {
		cm.dispose();
		cm.openNpc(9000143);      
        } else if (selection == 100000) {
                cm.sendSimple ("#r#e[ 전사 방어구 ]#n#k\r\n" +
            "#k#L0#CAP" +
            "#k#L1#TOP" +
            "#k#L2#BOTTOM" +
            "#k#L3#SHOES" +
            "#k#L4#OVERALL\r\n" +
            "#k#L5#GLOVES" +
            "#k#L6#SHIELD\r\n\r\n\r\n\r\n" +

            "#l#b#e[ 전사 무기 ]#n#k\r\n" +
            "#k#L7#Desperado" +
            "#k#L8#1HAND AXE" +
            "#k#L9#2HAND AXE\r\n" +
            "#k#L10#1HAND BLUNT" +
            "#k#L11#2HAND BLUNT" +
            "#k#L12#1HAND SWORD\r\n" +
            "#k#L13#2HAND SWORD" +
            "#k#L14#SPEAR" +
            "#k#L15#POLEARM");
        } else if (selection == 100001) {
                cm.sendSimple ("#r#e[ 마법사 방어구 ]#n#k\r\n" +
            "#k#L16#CAP" +
            "#k#L7#OVERALL\r\n" +
            "#k#L18#TOP" +
            "#k#L19#BOTTOM" +
            "#k#L20#SHOES" +
            "#k#L21#GLOVES" +
            "#k#L22#SHIELD\r\n\r\n\r\n\r\n" +

            "#l#b#e[ 마법사 무기 ]#n#k\r\n" +
            "#k#L23#SHINING ROD" +
            "#k#L24#DRAGON EQP" +
            "#k#L25#WAND" +
            "#k#L26#STAFF");
        } else if (selection == 100002) {
                cm.sendSimple ("#r#e[ 궁수 방어구 ]#n#k\r\n" +
            "#k#L27#CAP" +
            "#k#L28#TOP" +
            "#k#L29#BOTTOM" +
            "#k#L30#OVERALL\r\n" +
            "#k#L31#SHOES" +
            "#k#L32#GLOVES\r\n\r\n\r\n\r\n" +

            "#l#b#e[ 궁수 무기 ]#n#k\r\n" +
            "#k#L33#BOW" +
            "#k#L34#XBOW" +
            "#k#L35#DUALBOW\r\n" +
            "#k#L36#MAGIC ARROW" +
            "#k#L37#ARROW");
        } else if (selection == 100003) {
                cm.sendSimple ("#r#e[ 도적 방어구 ]#n#k\r\n" +
            "#l#L38##bCAP" +
            "#k#L39##bTOP" +
            "#k#L40##bBOTTOM" +
            "#k#L41##bOVERALL\r\n" +
            "#k#L42##bSHOES" +
            "#l#L43##bGLOVES" +
            "#l#L44##bSHIELD\r\n\r\n\r\n\r\n" +

            "#l#b#e[ 도적 무기 ]#n#k\r\n" +
            "#l#L45#ENERGY SWORD" +
            "#l#L46#DAGGER" +
            "#l#L47#CLAW\r\n" +
            "#l#L48#KATARA" +
            "#l#L49#CANE" +
            "#l#L50#CARD" +
	    "#k#L51#DART");
        } else if (selection == 100004) {
                cm.sendSimple ("#r#e[ 해적 방어구 ]#n#k\r\n" +
            "#k#L52#CAP" +
            "#k#L53#OVERALL\r\n" +
            "#k#L54#SHOES" +
            "#k#L55#GLOVES\r\n\r\n\r\n\r\n" +

            "#l#b#e[ 해적 무기 ]#n#k\r\n" +
            "#k#L56#KNUCKLE" +
            "#k#L57#GUN" +
            "#k#L58#CANNON\r\n" +
            "#l#L59#SOUL SHOOTER" +
            "#k#L60#BULLET");
        } else if (selection == 100005) {
                cm.sendSimple ("#r#e[ 아케인 상점 ]#n#k\r\n" +
            "#k#L66#무기" +
            "#k#L67#방어구");
        } else if (selection == 100006) {
                cm.sendSimple ("#r#e[ 악세사리 상점 ]#n#k" +
            "\r\n#L69#FACE" +
            "#L70#EYE" +
            "#L71#PENDANT\r\n" +
            "#L72#STRAP" +
            "#L73#RING" +
            "#L74#BADGE");
        } else if (selection == 100007) {
            cm.dispose();
            cm.openNpc(1002006);
        } else if (selection >= 0) {
            cm.CollectivelyShop(selection, 1530429);
            cm.dispose();
        }
    }
}