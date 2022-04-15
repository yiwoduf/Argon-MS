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
        var contents = "";
        contents += "#h0# 님 에이플러스에 오신것을 환영합니다.\r\n아래에서 원하시는 메뉴을 선택하여 주세요\r\n\r\n\r\n";

        contents += "                         #e[일반컨텐츠]#n\r\n";
        contents += "#b#L2192002#서버랭킹#l#d#n";
        contents += "#b#L1540011#성형하기#l#d#n";
        contents += "#b#L1012112#메소벌기#l#d#n";
        contents += "#b#L9000036#전투측정#l#d#n\r\n";
        contents += "#b#L4#결혼하기#l#d#n";
        contents += "#b#L2520002#추뎀구매#l#d#n";
        contents += "#b#L1022003#음악변경#l#d#n";
        contents += "#b#L1000000#캐샵이동#l#d#n\r\n";
        contents += "#b#L999999#자유시장#l#d#n";
        contents += "#b#L2010011#길드업무#l#d#n";
        contents += "#b#L3#낚시하기#l#d#n";
        contents += "#b#L2510012#하이스탯#l#d#n\r\n\r\n";
        
        contents += "                         #e#r[팡플컨텐츠]#d#l#n\r\n";
        contents += "#g#L2400006#로또구매#l#d#n";
        contents += "#g#L1012103#컨텐츠원#l#d#n";
        contents += "#g#L9300005#메소강화#l#d#n";
        contents += "#g#L1012101#초월강화#l#d#n\r\n";
        contents += "#g#L2470018#극한강화#l#d#n";
        contents += "#g#L9000018#팡플뱅킹#l#d#n";
        contents += "#g#L1052107#전구제거#l#d#n";
        contents += "#g#L9062004#컨텐츠투#l#d#n\r\n\r\n\r\n";

        contents += "                         #e[보스컨텐츠]#n\r\n";
        contents += "#r#L2411023#이지원정#l#d#n";
        contents += "#r#L2411024#노멀원정#l#d#n";
        contents += "#r#L1530051#구관탈환#l#d#n";
        contents += "#r#L9001061#늑대벼락#l#d#n\r\n";
        contents += "#r#L9070010#미스필드#l#d#n";
        contents += "#r#L0000005#서버보스#l#d#n\r\n\r\n";

        /*contents += "                         #e#b[강화컨텐츠]#d#l#n\r\n";
        contents += "#e#d#L9300005#메소강화#l#d#n";
        contents += "#e#d#L1012101#초월강화#l#d#n";
        contents += "#e#d#L2470018#극한강화#l#d#n";*/
        cm.sendSimple(contents);

    } else if (status == 1) {
        var s = selection;   
        if (s > 1000000) {
            cm.dispose();
            cm.openNpc(s);
        } else if (s == 1000000) {
            cm.dispose();
            cm.openCS();
        } else if (s == 999999) {
            cm.warp(910000001, 0);
            cm.dispose();
        } else if (s == 3) {
            cm.warp(3000500, 0);
            cm.dispose();
        } else if (s == 4) {
            cm.warp(680000300, 0);
            cm.dispose();
        }
    }
}
        
