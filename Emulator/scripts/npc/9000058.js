importPackage(Packages.scripting)
var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
 rock = "#fUI/UIWindow.img/RpsGame/rock#"; 
 paper = "#fUI/UIWindow.img/RpsGame/paper#"; 
 scissor = "#fUI/UIWindow.img/RpsGame/scissor#"; 
 win = "#fUI/UIWindow.img/RpsGame/win#"; 
 lose = "#fUI/UIWindow.img/RpsGame/lose#"; 
 draw = "#fUI/UIWindow.img/RpsGame/draw#"; 
 상대가위바위보 = ["#fUI/UIWindow.img/RpsGame/Frock#","#fUI/UIWindow.img/RpsGame/Fscissor#","#fUI/UIWindow.img/RpsGame/Fpaper#"]
 자기가위바위보 = ["#fUI/UIWindow.img/RpsGame/rock#","#fUI/UIWindow.img/RpsGame/scissor#","#fUI/UIWindow.img/RpsGame/paper#"]
    cm.getPlayer().setKeyValue("TestSV",1)
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        cm.getPlayer().setKeyValue("Rockgiver",null);
        cm.sendGetText("누구한테 가위바위보 신청을 하겠나?");
    } else if (status == 1) {
         target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getText())
         if ((target != null)) {
             target.setKeyValue("RockOk",null)
             target.setKeyValue("Rockgiver",""+cm.getPlayer().getName()+"");
             cm.getPlayer().setKeyValue("Rockresult",null);
             NPCScriptManager.getInstance().start(target.getClient(), 2135004);
             cm.sendSimple("초대장을 보냈습니다.\r\n\r\n#L0# #b수락했는지 확인")
         } else {
             cm.sendOk("입력하신 캐릭터가 자신이거나\r\n같은 채널에 접속중이지 않습니다.");
             cm.dispose();
         }
     } else if (status == 2) {
         if(target.getKeyValue("RockOk") == 1) {
             cm.sendSimple("상대가 가위바위보 대결을 수락했습니다.\r\n아래에서 선택해주세요.\r\n\r\n"
                          +"#L0#"+rock+"#l#L1#"+scissor+"#L2#"+paper+"#l");
         } else {
             cm.sendOk("아직 수락하지 않았습니다.");
             status -= 2;
         }
     } else if (status == 3) {
         if (selection != -1) {
             cm.getPlayer().setKeyValue("Rockresult",selection)
         }
         cm.sendSimple("결과발표를 하고 있습니다...\r\n#L0# #b결과가 발표되었는지 확인");
     } else if (status == 4) {
         if (target.getKeyValue("Rockresult") != null) {
            내결과 = cm.getPlayer().getKeyValue("Rockresult")
            상대결과 = target.getKeyValue("Rockresult");
            if ((내결과 == 0 && 상대결과 == 1) || (내결과 == 1 && 상대결과 == 2) || (내결과 == 2 && 상대결과 == 0)) {
                cm.sendOk("     #b상대#k"+상대가위바위보[상대결과]+"VS"+자기가위바위보[내결과]+"#r#h #\r\n"+win);
            } else if (내결과 == 상대결과) {
 		cm.sendOk("     #b상대#k"+상대가위바위보[상대결과]+"VS"+자기가위바위보[내결과]+"#r#h #\r\n"+draw);
            } else {
		cm.sendOk("     #b상대#k"+상대가위바위보[상대결과]+"VS"+자기가위바위보[내결과]+"#r#h #\r\n"+lose);
            }
            cm.dispose();
         } else {
            cm.sendOk("아직 결과가 집계되지 않았습니다.");
            status -=2;
         }
     }
}