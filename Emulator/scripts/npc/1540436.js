var status = -1;

function start() {
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
var choose ="";
	choose +="#L1##b#i2431938# 瑞顫綠蝶 鼻薄#k#l    #L2##b#i4310156# 擄樂椰蝶 鼠晦#k#l"; 
        choose += "\r\n式式式式式式式式式式式式式式式式式式式式式\r\n";
        choose +="#L3##b#i2431413# 顫橾楛お#k#l       #L10##b#i1190302# 縞綰源#k#l"; 
        choose += "\r\n式式式式式式式式式式式式式式式式式式式式式\r\n";
        choose +="#L6##b#i1032200# 學撮餌葬#k#l          #L4##b#i1004422# 擄樂椰蝶#n#k#l";
        choose += "\r\n式式式式式式式式式式式式式式式式式式式式式\r\n";
      //  choose +="#L10##b#i1190302# 縞綰源#k#l";
	//choose +="\r\n#L10##b#i2430242# 塭檜註 鼻薄"; 
        if (cm.getPlayer().hasGmLevel(10)){
        choose += "";
}
        cm.sendSimple(choose);

    } else if (status == 1) {
        var s = selection;
        cm.dispose();
        if (s == 0) {
            cm.enterCS();
 } else if (s == 1) {
  cm.openShop (10064);
 } else if (s == 2) {
  cm.openShop (1540013);
 } else if (s == 99) {
  cm.openNpc (1104206);
 } else if (s == 3) {
  cm.openShop (10063);
 } else if (s == 4) {
  cm.openShop (10065);
 } else if (s == 5) {
  cm.openNpc (9000095);
 } else if (s == 6) {
  cm.openShop (10069);
 } else if (s == 7) {
  cm.openNpc (2520001);
 } else if (s == 8) {
  cm.openNpc (9010033);
 } else if (s == 9) {
  cm.sendOk ("盪蝶じ蝶 囀檣擎 #e晦棟衛蝶蠱 - 換歎檜唸薑 掖??#n 縑憮 掖?納牮Ф鶺祧懂炴?.");
 } else if (s == 10) {
  cm.openNpc (3000131);
        }
    }
}