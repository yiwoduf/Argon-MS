/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Pure Online Development Source Script)

	통수킹창용 에 의해 만들어 졌습니다.

	엔피시아이디 : 9000178

	엔피시 이름 : 정체불명의 마법사

	엔피시가 있는 맵 : 헤네시스 : 헤네시스 (100000000)

	엔피시 설명 : 영혼연구가
        QS2 += "\r\n#fUI/UIWindow2.img/MapleStyle/RewardPopup/backgrnd2#\r\n"

*/

var status = 0;
importPackage(Packages.server);
importPackage(Packages.constants);
importPackage (java.util);
importPackage (Packages.tools);
importPackage (Packages.server.quest);
importPackage(java.awt);
importPackage(java.lang);
importPackage(Packages.client.inventory);
importPackage(Packages.client.skills);
importPackage(Packages.server.items);
importPackage(Packages.client.items);
importPackage(Packages.client);
importPackage(Packages.tools.RandomStream);

var selected = 0;
var check = 0;
var sel = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
      if (status == 0) {
        var str = "사람들은 말합니다. 인간이란 자유를 빼앗겨봐야 \r\n자신의 본모습을 안다고. 재미있지않습니까?\r\n저 또한 여기에 자유를 뺏긴것같아요.#b\r\n";
        str += "\r\n#fUI/UIWindow2.img/UtilDlgEx/list1#"
        str += "\r\n#L79#아이템퀘스트를 진행하겠습니다.#l\r\n";
        str += "#L82#보스들의 증거로 교환하고싶습니다.#l\r\n";
        str += "#L81#모험가타이틀을 획득하고싶습니다.#l\r\n";
        str += "#L84#시그너스타이틀을 획득하고싶습니다.#l\r\n";
        str += "#L85#영웅타이틀을 획득하고싶습니다.#l\r\n\r\n";
        str += "\r\n#fUI/UIWindow2.img/UtilDlgEx/list4#"
	str += "\r\n#L92# 소울웨폰 감정을 받고 싶습니다.#l";
	str += "\r\n#L91# 루타비스 퀘스트를 수락하고싶습니다.#l";
        str += "\r\n#L89# 황혼의 페리온 퀘스트를 수락하고싶습니다.#l";
        cm.sendSimple(str);
     } else if (status == 1) {
	if(selection == 92) {
	sel = 1;
	cm.sendSimple(cm.SoulItemList(cm.getClient(),"어떤 아이템을 감정해 보시겠습니까."));
	} else if(selection == 91) {
	if(cm.getPlayer().getLevel() >= 125) {
	if(cm.getPlayer().getKeyValue("luta") == null) {
	check = 1;
	cm.sendYesNo("#b나인하트#k 님이 #b" + cm.getPlayer().getName() + "#k 님에게 급한 용무가 있다고합니다.\r\n(퀘스트를 진행하시겠다면 '예'  버튼을 눌러주세요)");
	} else {
	cm.dispose();
	cm.openNpc(1103005);
	}
	} else {
	cm.sendOk("#b루타비스 퀘스트#k는 레벨 125부터 진행이 가능합니다.");
	cm.dispose();
	}
	} else if (selection == 86) {
     if (cm.getQuestStatus(4310) == 0) { 
            cm.completeQuest(4310);
     }
     if (cm.getQuestStatus(4311) == 0) { 
            cm.startQuest(4311);
     }
     if (cm.getQuestStatus(4311) == 1) { 
       cm.dispose();
       cm.warp(231010000, 1);
       cm.sendOk("벚꽃성으로 보내드리겠습니다.즐거운시간 되십시요.");
     } else {
       cm.sendOk("현재 모험가님은 벚꽃성 퀘스트를 진행할수없습니다.");
       cm.dispose();
     }       
     } else if (selection == 90) {
     if (cm.getQuestStatus(31901) == 2) { 
       cm.dispose();
       cm.warp(913050010, 1);
       cm.sendOk("보내드리겠습니다.즐거운시간 되십시요.");
     } else {
       cm.sendOk("선행퀘스트가 완료되지않았습니다.");
     }
     } else if (selection == 89) {
     if (cm.getQuestStatus(31900) == 0) { 
            cm.completeQuest(31900);
     }
     if (cm.getQuestStatus(31901) == 0) { 
            cm.startQuest(31901);
     }
     if (cm.getQuestStatus(31901) == 1) { 
       cm.dispose();
       cm.warp(102000003, 1);
       cm.sendOk("보내드리겠습니다.즐거운시간 되십시요.\r\n이후에 저를 누르시면 황혼의 페리온으로 이동됩니다.");
     } else if (cm.getQuestStatus(31901) == 2) { 
       cm.dispose();
       cm.warp(273000000, 1);
       cm.sendOk("보내드리겠습니다.즐거운시간 되십시요.");
     } else if (cm.getQuestStatus(31901) == 1) { 

     } else {
       cm.sendOk("현재 모험가님은 퀘스트를 진행할수없습니다.");
       cm.dispose();
     }       


     } else if (selection == 87) {
     if (cm.getQuestStatus(4327) == 2 && cm.getQuestStatus(4311) == 1) {
      // cm.특별아이템에픽(1112135);
       cm.sendOk("퀘스트가 완료되었습니다."); 
       cm.completeQuest(4311);
       cm.dispose();
     } else {
     if (cm.getQuestStatus(4327) == 0 || cm.getQuestStatus(4327) == 1) { 
       cm.sendOk("미완료 퀘스트가 있습니다.");
       cm.dispose();
     } else if (cm.getQuestStatus(4311) == 2) { 
       cm.sendOk("이미완료하였습니다.");
       cm.dispose();
     }
     }

     } else if (selection == 88) {
     if (cm.getQuestStatus(3500) == 0) { 
            cm.startQuest(3500);
     }
       cm.warp(270000000);
       cm.dispose();
       cm.sendOk("요정학원으로 보내드리겠습니다.즐거운시간 되십시요.");
     } else if (selection == 82) {
        var QS7 = "보스들의 증거를 가지고계신가요?";
        QS7 += "\r\n가지고 계신다면 저하고 거레를 하지않으실레요?\r\n"
     if (cm.haveItem(4000659, 1) && cm.haveItem(4033311, 1) && cm.haveItem(4033312, 1) && cm.haveItem(4033302, 1) && cm.haveItem(4033303, 1) && cm.haveItem(4033304, 1)) {
        QS7 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
        QS7 += "\r\n보스들의 증거를 모으고 있으신가봐요.\r\n"
        QS7 += "이렇게 많은 보스들의 증거는 처음보는것같아요!\r\n"
     } else {
        QS7 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1##k\r\n"
     }
        QS7 += "#k\#r#L60##b#v4000659#1개#k,#b#v4033311#1개#k,#b#v4033312#1개#k\r\n,#b#v4033302#1개#k,#b#v4033303#1개#k,#b#v4033304#1개#k\r\n #r(보상 : 스칼렛 랜덤아이템 )#k#l\r\n"
        cm.sendSimple(QS7);
     } else if (selection == 83) {
        var QS = "\r\n세계의 이야기는 수많이 존제하고 있다는것을 알시는가요?\r\n";
        QS += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1##k"
        QS += "\r\n저한테 그이야기를 알려주시지 않으실레요? \r\n저는 수많은 이야기와 곁말을 알고싶어요.#b\r\n";
        QS += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list2##k"
        
        QS += "\r\n\r\n #fUI/UIWindow2.img/RemainLife/number/1# #L21# #r#b엘린숲#k 완료 보상을 받겠습니다. #l\r\n#l\r\n#l\r\n #v2430368# 1개 #v5062000# 30개#l #v2048709# 2개\r\n";
        
        QS += "\r\n #fUI/UIWindow2.img/RemainLife/number/2# #L22# #r#b황금사원#k 완료 보상을 받겠습니다. #l\r\n#l\r\n#l\r\n #v2430368# 1개 #v5062002# 30개#l #v2048706# 2개\r\n";
       
        QS += "\r\n #fUI/UIWindow2.img/RemainLife/number/3# #L23# #r#b테마파크#k 완료 보상을 받겠습니다. #l\r\n#l\r\n#l\r\n #v2430368# 2개 #v5062005# 30개#l #v2048707# 2개\r\n";
       
        QS += "\r\n #fUI/UIWindow2.img/RemainLife/number/4# #L26# #r#b테라숲#k 완료 보상을 받겠습니다. #l\r\n#l\r\n#l\r\n #v2430368# 2개 #v5062005# 30개  #v2048708# 1개\r\n";
        
        QS += "\r\n #fUI/UIWindow2.img/RemainLife/number/5# #L25# #r#b크림슨우드#k 완료 보상을 받겠습니다. #l\r\n#l\r\n#l\r\n #v2430368# 3개 #v5062005# 30개#l #v2048708# 2개\r\n";
        
        QS += "\r\n #fUI/UIWindow2.img/RemainLife/number/6# #L24# #r#b암벽거인#k 완료 보상을 받겠습니다. #l\r\n#l\r\n#l\r\n #v2430368# 3개 #v5062005# 50개 #v2049100# 10개 #v2048708# 3개\r\n";

        QS += "\r\n #L250# #v1112135# [이벤트] 벚꽃성보상아이템을 받겠습니다. \r\n";
        cm.sendSimple(QS);
      } else if (selection == 81) {
        var QS4 = "\r\n안녕하세요? 모험가님! 혹시 타이틀에 대해 알고계신가요?";
        QS4 += "\r\n그것은 바로 스스로가 인정받는예요. 바로 자신의 힘으로\r\n혹시 도전하고 싶은신가요?\r\n";
        QS4 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1#"
        QS4 += "\r\n\r\n#v1142009##v1142010##v1142011##fUI/UIWindow2.img/Title/main/icon1# #v1142012##v1142013##v3700148#"
        QS4 += "\r\n\r\n타이틀을 획득하시면 다양한 혜택이 적용됩니다."
        QS4 += "\r\n자신 스스로가 인정받을곳을 선택해주세요. \r\n제가 거기로 보내드릴게요.\r\n[한정반복퀘스트입니다.]";
        QS4 += "\r\n #k\#L210# #v1142009# 투신\r\n#l\r\n"
        QS4 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS4 += "\r\n\r\n전사계열의 최고의 타이틀입니다.\r\n이것을 획득한자는 전사계열에서 전설이됩니다.\r\n[한정반복퀘스트입니다.]";
        QS4 += "\r\n #k\#L211# #v1142010# 현자\r\n"
        QS4 += "\r\n#l\r\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS4 += "\r\n\r\n마법사계열의 최고의 타이틀입니다.\r\n이것을 획득한자는 마법사계열에서 전설이됩니다.\r\n[한정반복퀘스트입니다.]";
        QS4 += "\r\n #k\#L212# #v1142011# 스나이퍼 로드\r\n"
        QS4 += "\r\n#l\r\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS4 += "\r\n\r\n궁수계열의 최고의 타이틀입니다.\r\n이것을 획득한자는 궁수계열에서 전설이됩니다.\r\n[한정반복퀘스트입니다.]";
        QS4 += "\r\n #k\#L213# #v1142012# 레전더리 시프\r\n"
        QS4 += "\r\n#l\r\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS4 += "\r\n\r\n도적계열의 최고의 타이틀입니다.\r\n이것을 획득한자는 도적계열에서 전설이됩니다.\r\n[한정반복퀘스트입니다.]";
        QS4 += "\r\n #k\#L214# #v1142013# 해적왕\r\n"
        QS4 += "\r\n#l\r\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS4 += "\r\n\r\n해적계열의 최고의 타이틀입니다.\r\n이것을 획득한자는 해적계열에서 전설이됩니다.\r\n[한정반복퀘스트입니다.]";
        QS4 += "\r\n #k\#L215# #v3700148# 스토리 all 완료자\r\n#l"
        QS4 += "\r\n#l\r\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS4 += "\r\n\r\n스토리퀘스트 올 클리어 타이틀입니다\r\n이것은  스토리퀘스트 올 클리어 증표입니다\r\n[한정퀘스트입니다.]";
        cm.sendSimple(QS4);
      } else if (selection == 84) {
        var QS8 = "어리석은 자여 시그너스 타이틀이 뭔지는 아는가?";
        QS8 += "\r\n바로 나한테 인정받는거지 바로 그대의 힘으로\r\n준비는 되었는가?\r\n";
        QS8 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1#"
        QS8 += "\r\n\r\n #fUI/UIWindow2.img/Title/main/icon1# [타이틀을 획득하시면 다양한 혜택이 적용됩니다.]"
        QS8 += "\r\n\r\n선택하라 나한테 인정받을 곳을 \r\n나의 힘으로 그곳으로 보내주마\r\n[한정반복퀘스트입니다.]";
        QS8 += "\r\n #k\#L300# #v1142069# 기사단장\r\n#l\r\n"
        QS8 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS8 += "\r\n\r\n시그너스의 최고의 타이틀입니다.\r\n이것을 획득한자는 시그너스에서 단장이됩니다.\r\n[한정반복퀘스트입니다.]";
        cm.sendSimple(QS8);
      } else if (selection == 85) {
        var QS9 = "어리석은 자여 영웅타이틀이 뭔지는 아는가?";
        QS9 += "\r\n바로 나한테 인정받는거지 바로 그대의 힘으로\r\n준비는 되었는가?\r\n";
        QS9 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1#"
        QS9 += "\r\n\r\n #fUI/UIWindow2.img/Title/main/icon1# [타이틀을 획득하시면 다양한 혜택이 적용됩니다.]"
        QS9 += "\r\n\r\n선택하라 나한테 인정받을 곳을 \r\n나의 힘으로 그곳으로 보내주마\r\n[한정반복퀘스트입니다.]";
        QS9 += "\r\n #k\#L400# #v1142379# 괴도 팬텀\r\n#l\r\n"
        QS9 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS9 += "\r\n\r\도둑들의 최고의 타이틀입니다.\r\n이것을 획득한자는 도들들 중에서 괴도 팬텀이됩니다.\r\n[한정반복퀘스트입니다.]";
        QS9 += "\r\n #k\#L401# #v1142158# 영웅의 후계자\r\n#l\r\n"
        QS9 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS9 += "\r\n\r\에반들의 최고의 타이틀입니다.\r\n이것을 획득한자는 에반들 중에서 후계자가됩니다.\r\n[한정반복퀘스트입니다.]";
        QS9 += "\r\n #k\#L402# #v1142483# 운명의 대적자\r\n#l\r\n"
        QS9 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS9 += "\r\n\r\루미너스들의 최고의 타이틀입니다.\r\n이것을 획득한자는 루미너스들 중에서 짱이됩니다.\r\n[한정반복퀘스트입니다.]";
        QS9 += "\r\n #k\#L403# #v1142488# 극의에 도달한 자\r\n#l\r\n"
        QS9 += "\r\n #l\n 난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS9 += "\r\n\r\카이저들의 최고의 타이틀입니다.\r\n이것을 획득한자는 카이저들 중에서 짱이됩니다.\r\n[한정반복퀘스트입니다.]";
        cm.sendSimple(QS9);
      } else if (selection == 80) { 8810018
        var QS3 = "세계에 보스들을 처리하고싶다고요?";
        QS3 += "\r\n하지만 그들은 매우 강력해요.모험가님 \r\n혹시 그래도 도전하고 싶은신가요?\r\n";
        QS3 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1#"
        QS3 += "\r\n\r\n #fUI/UIWindow2.img/characterCard/BtHelp/normal/0#   TIP : [파티가 구성가능합니다.]"
        QS3 += "\r\n\r\n도전하시고 싶으신 보스가 있으신가요? \r\n제가 거기로 보내드릴게요.\r\n[반복퀘스트입니다.]\r\n";
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/1# #k\#L10# 심연속 폐광의 군주 자쿰\r\n#l"
        QS3 += "\r\n #l\n #fUI/UIWindow2.img/MobGage/Mob/8800000# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/2# #k\#L15# 심연속 폐광의 군주 카오스 자쿰\r\n#l"
        QS3 += "\r\n #l\n #fUI/UIWindow2.img/MobGage/Mob/8800000# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/3# #k\#L11# 용의 군주라 불리는 혼테일"
        QS3 += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8810018# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/4# #k\#L47# 검은마법사의 수문장 반 레온"
        QS3 += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8840000# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/5# #k\#L12# 시간을 탈취한자 아카이럼"
        QS3 += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8860000# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/6# #k\#L13# 아스완의 망령을 다스리는 힐라"
        QS3 += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8870000# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]l\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/7# #k\#L14# 시간의 신비 핑크빈"
        QS3 += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8820001# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/8# #k\#L48# 미래의 여제 시그너스"
        QS3 += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8850011# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/9# #k\#L49# 폭군의 왕 매그너스"
        QS3 += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8880000# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        cm.sendSimple(QS3);
      } else if (selection == 79) {
        var QS2 = "세상에는 다양한 보물들이 존재하지만 공짜란 없습니다..#b\r\n";
        QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1##k"
        QS2 += "\r\n 무엇을 선택하시겠습니까? 거레는 다양합니다.\r\n 특별히 필요한곳으로 보내주도록해드리지요.#b\r\n"
        QS2 += "\r\n#fUI/UIWindow2.img/EvolvingSystem/BtStart/normal/0#\r\n"
        QS2 += "#k\#r#L1##b#v4000171#500개#k를 모아오겠습니다.(보상 : #v1152009# )#l"
        QS2 += "\r\n #k\#r#L5##b#v4000458#300개#k를 모아오겠습니다.(보상 : #v1112594# )#l"
        QS2 += "\r\n #k\#r#L3##b#v4000440#550개#k를 모아오겠습니다.(보상 : #v1032101# )#l"
        QS2 += "\r\n #k\#r#L4##b#v4000180#,#v4000181#550개#k를 모아오겠습니다.(보상 : #v1022123# )#l"
        QS2 += "\r\n #k\#r#L2##b#v4000364#,#v4000365#550개#k를 모아오겠습니다.(보상 : #v1122118# )#l\r\n"
        if (cm.haveItem(4000171, 500)) {
            QS2 += "\r\n\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
            QS2 += "#k\r\n#L20##r#b#v4000171#500개#k를 모아왔습니다.#l\r\n#l\r\n #e└ #n#v1152009#아이템의 퀘스트를 종료하겠습니다.#l";
        }

        if (cm.haveItem(4000458, 300)) {
            QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
            QS2 += "#k\r\n#L16##r#b#v4000458#300개#k를 모아왔습니다.#l\r\n#l\r\n #e└ #n#v1112594#아이템의 퀘스트를 종료하겠습니다.#l";
        }

        if (cm.haveItem(4000440, 550)) {
            QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
            QS2 += "#k\r\n#L18##r#b#v4000440#550개#k를 모아왔습니다.#l\r\n#l\r\n #e└ #n#v1032101#아이템의 퀘스트를 종료하겠습니다.#l";
        }

        if (cm.haveItem(4000180, 550) && cm.haveItem(4000181, 550)) {
            QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
            QS2 += "#k\r\n#L17##r#b#v4000180#550개,#v4000181#550개#k를 모아왔습니다.#l\r\n#l\r\n #e└ #n#v1022123#아이템의 퀘스트를 종료하겠습니다.#l";
        }

        if (cm.haveItem(4000364, 550) && cm.haveItem(4000365, 550)) {
            QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
            QS2 += "#k\r\n#L19##r#b#v4000364#550개,#v4000365#550개#k를 모아왔습니다.#l\r\n#l\r\n #e└ #n#v1122118#아이템의 퀘스트를 종료하겠습니다.#l";
        }

        cm.sendSimple(QS2);
      }
      } else if (status == 2) {
	if (sel == 1) {
	sel = selection;
	var equip = cm.getPlayer().getInventory(MapleInventoryType.EQUIP);
	var item = (Packages.client.items.Equip);
	item = ItemInformation.getInstance().getEquipById(equip.getItem(sel).getItemId());
	var name = ItemInformation.getInstance().getName(2591024);
	var itemid = (2590999 + parseInt(cm.SoulItem(sel,false)));
	var skillid = 0;
       if ((itemid >= 2591010 && itemid <= 2591016) || (itemid >= 2591089 && itemid <= 2591095)) {
           skillid = 80001217; //락스피릿
       } else if ((itemid >= 2591017 && itemid <= 2591023) || (itemid >= 2591096 && itemid <= 2591102)) {
           skillid = 80001213; //아니
       } else if ((itemid >= 2591024 && itemid <= 2591030) || (itemid >= 2591103 && itemid <= 2591109)) {
           skillid = 80001214; //드래곤 라이더
       } else if ((itemid >= 2591031 && itemid <= 2591037) || (itemid >= 2591110 && itemid <= 2591116)) {
           skillid = 80001212; //렉스
       } else if ((itemid >= 2591038 && itemid <= 2591044) || (itemid >= 2591117 && itemid <= 2591123)) {
           skillid = 80001218; //무공
       } else if ((itemid >= 2591045 && itemid <= 2591054) || (itemid >= 2591124 && itemid <= 2591131)) {
           skillid = 80001210;
       } else if ((itemid >= 2591055 && itemid <= 2591064) || (itemid >= 2591140 && itemid <= 2591147)) {
           skillid = 80001219; // 핑크빈
       } else if ((itemid >= 2591065 && itemid <= 2591074) || (itemid >= 2591132 && itemid <= 2591139)) {
           skillid = 80001215; // 반레온
       } else if ((itemid >= 2591075 && itemid <= 2591082) || (itemid >= 2591179 && itemid <= 2591186)) {
           skillid = 80001266;//시그너스
       } else if ((itemid >= 2591148 && itemid <= 2591154) || (itemid >= 2591164 && itemid <= 2591170)) {
           skillid = 80001273; //크세르크세스
       } else if ((itemid >= 2591155 && itemid <= 2591162) || (itemid >= 2591171 && itemid <= 2591178)) {
           skillid = 80001216; //자쿰
       } else if ((itemid >= 2591187 && itemid <= 2591193) || (itemid >= 2591203 && itemid <= 2591209)) {
           skillid = 80001280; //에피네아
       } else if ((itemid >= 2591194 && itemid <= 2591202) || (itemid >= 2591210 && itemid <= 2591217)) {
           skillid = 80001281; //이카이럼
       } else if ((itemid >= 2591218 && itemid <= 2591224) || (itemid >= 2591234 && itemid <= 2591240)) {
           skillid = 80001321; //피아누스
       } else if ((itemid >= 2591225 && itemid <= 2591232) || (itemid >= 2591241 && itemid <= 2591248)) {
           skillid = 80001322; //힐라
       } else if ((itemid >= 2591249 && itemid <= 2591255) || (itemid >= 2591265 && itemid <= 2591271)) {
           skillid = 80001339; //블랙 슬라임
       } else if ((itemid >= 2591256 && itemid <= 2591263) || (itemid >= 2591272 && itemid <= 2591279)) {
           skillid = 80001340; //매그너스
       } else if (itemid >= 2591288 && itemid <= 2591295) {
           skillid = 80001395; //무르무르
       }
	cm.sendOk("#e#t" + equip.getItem(sel).getItemId() + "##n 의 소울 감정을 해보도록 하죠.\r\n\r\n#d장착된 소울#k : #e#d<#i" + itemid + "#" + name + ">#n#k#n#k\r\n\r\n#b소울스킬 : " + GameConstants.getSoulSkillG(cm.SoulItem(sel,true)) + " 소울을 소모하여 " + cm.getSoulSkillName(skillid) + " 을(를) 발동\r\n\r\n#k#e<추가 감정>\r\n#n#b#t" + itemid + "#에 적힌 한소절 : " + cm.스킬설명(skillid,true));
	cm.dispose();
	} else if(check == 1) {
	cm.getPlayer().setKeyValue("luta","start");
	cm.dispose();
	cm.openNpc(1103005);
	} else if (selection == 21) {
        if(cm.getQuestStatus(31229) == 2 && cm.getPlayer().getKeyValue("QUEST1") == null) { 
        cm.gainItem(2430368, 1);
        cm.gainItem(5062000, 30);
        cm.gainItem(2048709, 2);
        cm.getPlayer().setKeyValue("QUEST1", "1");
        cm.dispose();
      } else {
        cm.sendOk("이미 보상을 받으셨거나 아직 스토리퀘스트를 완료하지 못하셨습니다.");
        cm.dispose();
      }

      } else if (selection == 250) {
        if(cm.getQuestStatus(4311) == 2 && cm.getPlayer().getKeyValue("QUEST10") == null) { 
        cm.특별아이템에픽(1112135);
        cm.getPlayer().setKeyValue("QUEST10", "1");
        cm.sendOk("이벤트기간안에 이벤트를 완료하셨습니다.");
        cm.dispose();
      } else {
        cm.sendOk("이미 보상을 받으셨거나 아직 스토리퀘스트를 완료하지 못하셨습니다.");
        cm.dispose();
      }

      } else if (selection == 22) {
        if(cm.getQuestStatus(3872) == 2 && cm.getPlayer().getKeyValue("QUEST2") == null) { 
        cm.gainItem(2430368, 1);
        cm.gainItem(5062002, 30);
        cm.gainItem(2048706, 2);
        cm.getPlayer().setKeyValue("QUEST2", "1");
        cm.dispose();
      } else {
        cm.sendOk("이미 보상을 받으셨거나 아직 스토리퀘스트를 완료하지 못하셨습니다.");
        cm.dispose();
      }
      } else if (selection == 23) {
        if(cm.getQuestStatus(31328) == 2 && cm.getPlayer().getKeyValue("QUEST3") == null) { 
        cm.gainItem(2430368, 2);
        cm.gainItem(5062005, 30);
        cm.gainItem(2048707, 2);
        cm.getPlayer().setKeyValue("QUEST3", "1");
        cm.dispose();
     } else {
        cm.sendOk("이미 보상을 받으셨거나 아직 스토리퀘스트를 완료하지 못하셨습니다.");
        cm.dispose();
     }
     } else if (selection == 24) {
        if(cm.getQuestStatus(31352) == 2 && cm.getPlayer().getKeyValue("QUEST4") == null) { 
        cm.gainItem(2430368, 3);
        cm.gainItem(5062005, 50);
        cm.gainItem(2049100, 10);
        cm.gainItem(2048708, 3);
        cm.getPlayer().setKeyValue("QUEST4", "1");
        cm.dispose();
     } else {
       cm.sendOk("이미 보상을 받으셨거나 아직 스토리퀘스트를 완료하지 못하셨습니다.");
       cm.dispose();
     }
     } else if (selection == 25) {
        if(cm.getQuestStatus(31259) == 2 && cm.getPlayer().getKeyValue("QUEST5") == null) { 
        cm.gainItem(2430368, 3);
        cm.gainItem(5062005, 30);
        cm.gainItem(2048708, 2);
        cm.getPlayer().setKeyValue("QUEST5", "1");
        cm.dispose();
     } else {
          cm.sendOk("이미 보상을 받으셨거나 아직 스토리퀘스트를 완료하지 못하셨습니다.");
          cm.dispose();
     }
     } else if (selection == 26) {
        if(cm.getQuestStatus(3782) == 2 && cm.getPlayer().getKeyValue("QUEST6") == null) { 
        cm.gainItem(2430368, 2);
        cm.gainItem(5062005, 30);
        cm.gainItem(2048708, 1);
  cm.gainhorong(3700142);
        cm.getPlayer().setKeyValue("QUEST6", "1");
        cm.dispose();
     } else {
          cm.sendOk("이미 보상을 받으셨거나 아직 스토리퀘스트를 완료하지 못하셨습니다.");
          cm.dispose();
     }

 } else if (selection == 210) {
       if (cm.haveItem(4000653, 550)) {
       cm.특별아이템레전드리(1142009);
       cm.gainItem(4000653, -550);
       cm.sendOk("원하시던 물건이 맞으신가요?");
     } else {
       cm.sendOk("퀘스트아이템 : #v4000653# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
     }
       cm.dispose();
     } else if (selection == 211) {
       if (cm.haveItem(4000650, 550)) {
       cm.특별아이템레전드리(1142010);
       cm.gainItem(4000650, -550);
       cm.sendOk("원하시던 물건이 맞으신가요?");
     } else {
       cm.sendOk("퀘스트아이템 : #v4000650# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
     }
       cm.dispose();
     } else if (selection == 212) {
       if (cm.haveItem(4000652, 550)) {
       cm.특별아이템레전드리(1142011);
       cm.gainItem(4000652, -550);
       cm.sendOk("원하시던 물건이 맞으신가요?");
     } else {
       cm.sendOk("퀘스트아이템 : #v4000652# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
     }
       cm.dispose();
     } else if (selection == 213) {
       if (cm.haveItem(4000649, 550)) {
       cm.특별아이템레전드리(1142012);
       cm.gainItem(4000649, -550);
       cm.sendOk("원하시던 물건이 맞으신가요?");
     } else {
       cm.sendOk("퀘스트아이템 : #v4000649# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
     }
       cm.dispose();
     } else if (selection == 214) {
       if (cm.haveItem(4000651, 550)) {
       cm.특별아이템레전드리(1142013);
       cm.gainItem(4000651, -550);
       cm.sendOk("원하시던 물건이 맞으신가요?");
     } else {
       cm.sendOk("퀘스트아이템 : #v4000651# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
     }
       cm.dispose();
     } else if (selection == 215) {
        if(cm.getQuestStatus(31229) == 2 && cm.getQuestStatus(3872) == 2 && cm.getQuestStatus(31328) == 2 && cm.getQuestStatus(3782) == 2 && cm.getQuestStatus(31259) == 2 && cm.getQuestStatus(31352) == 2 && cm.getPlayer().getKeyValue("QUEST7") == null) { 
        cm.gainhorong(3700148); 
        cm.getPlayer().setKeyValue("QUEST7", "1");
        cm.dispose();
     } else {
          cm.sendOk("모든 스토리퀘스트를 완료하지않았어!");
          cm.dispose();
     }

     } else if (selection == 300) {
       if (cm.haveItem(4000654, 550)) {
       cm.특별아이템레전드리(1142069);
       cm.gainItem(4000654, -550);
       cm.sendOk("원하시던 물건이 맞으신가요?");
     } else {
       cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
     }

     } else if (selection == 400) {
       if (cm.haveItem(4000654, 550)) {
       cm.특별아이템레전드리(1142379);
       cm.gainItem(4000654, -550);
       cm.sendOk("원하시던 물건이 맞으신가요?");
     } else {
       cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
     }

     } else if (selection == 401) {
       if (cm.haveItem(4000654, 550)) {
       cm.특별아이템레전드리(1142158);
       cm.gainItem(4000654, -550);
       cm.sendOk("원하시던 물건이 맞으신가요?");
     } else {
       cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
     }

     } else if (selection == 402) {
       if (cm.haveItem(4000654, 550)) {
       cm.특별아이템레전드리(1142483);
       cm.gainItem(4000654, -550);
       cm.sendOk("원하시던 물건이 맞으신가요?");
     } else {
       cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
     }

     } else if (selection == 403) {
       if (cm.haveItem(4000654, 550)) {
       cm.특별아이템레전드리(1142488);
       cm.gainItem(4000654, -550);
       cm.sendOk("원하시던 물건이 맞으신가요?");
     } else {
       cm.sendOk("퀘스트아이템 : #v4000654# \r\n퀘스트아이템을 550개를 모아오는것이 인정조건이예요.");
     }

          } else if (selection == 10) {
                    cm.dispose();
                    cm.warp(211042400);
                    cm.sendOk("퀘스트에 필요한 재료를 다모으시기를 바래요.");
          } else if (selection == 15) {
                    cm.dispose();
                    cm.warp(211042401);
                    cm.sendOk("퀘스트에 필요한 재료를 다모으시기를 바래요.");
          } else if (selection == 11) {
                    cm.dispose();
                    cm.warp(240050400);
                    cm.sendOk("퀘스트에 필요한 재료를 다모으시기를 바래요.");
          } else if (selection == 12) {
                cm.dispose();
                cm.warp(223030000);
                cm.sendOk("퀘스트에 필요한 재료를 다모으시기를 바래요.");
          } else if (selection == 13) {
                    cm.dispose();
                    cm.warp(262030000);
                    cm.sendOk("퀘스트에 필요한 재료를 다모으시기를 바래요.");
          } else if (selection == 14) {
                    cm.dispose();
                    cm.warp(270050000);
                    cm.sendOk("퀘스트에 필요한 재료를 다모으시기를 바래요.");
          } else if (selection == 47) {
                    cm.dispose();
                    cm.warp(211070000);
                    cm.sendOk("퀘스트에 필요한 재료를 다모으시기를 바래요.");
          } else if (selection == 48) {
                    cm.dispose();
                    cm.warp(271040000);
                    cm.sendOk("퀘스트에 필요한 재료를 다모으시기를 바래요.");
          } else if (selection == 49) {
                    cm.dispose();
                    cm.warp(401060000);
                    cm.sendOk("퀘스트에 필요한 재료를 다모으시기를 바래요.");
 } else if (selection == 50) {
		    cm.dispose();
                    cm.openShop(9000100);
          } else if (selection == 51) {
		    cm.dispose();
                    cm.openShop(9070001);
          } else if (selection == 52) {
		    cm.dispose();
                    cm.openShop(2161004);
          } else if (selection == 53) {
		    cm.dispose();
                    cm.openShop(9072100);
          } else if (selection == 54) {
		    cm.dispose();
                    cm.openShop(9010039);
          } else if (selection == 55) {
		    cm.dispose();
                    cm.openNpc(2161008);

          } else if (selection == 1) {
                    cm.dispose();
                    cm.warp(222010200);
                    cm.sendOk("퀘스트에 필요한 재료를 다모으시기를 바래요.");
          } else if (selection == 2) {
                    cm.dispose();
                    cm.warp(261020400);
                    cm.sendOk("퀘스트에 필요한 재료를 다모으시기를 바래요.");
          } else if (selection == 3) {
                    cm.dispose();
                    cm.warp(300010400);
                    cm.sendOk("퀘스트에 필요한 재료를 다모으시기를 바래요.");
          } else if (selection == 4) {
                    cm.dispose();
                    cm.warp(230040400);
                    cm.sendOk("퀘스트에 필요한 재료를 다모으시기를 바래요.");
         } else if (selection == 5) {
                    cm.dispose();
                    cm.warp(270030500);
                    cm.sendOk("퀘스트에 필요한 재료를 다모으시기를 바래요.");
         } else if (selection == 20) {
                if (cm.haveItem(4000171, 500)) {
		var leftslot3 = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot();
               if (leftslot3 < 3) {
                   cm.sendOk("인벤토리 공간이 최소한 5칸은 필요합니다. 장비 탭의 공간을 3칸이상 비워주신 후 다시 열어주세요.");
                   cm.dispose();
                   return;
               }
                    cm.gainhorong(1152009);
                    cm.gainItem(4000171, -500);
                    cm.sendOk("원하시던 물건이 맞으신가요?");
                } else {
                    cm.sendOk("#b#v 4000171##k 아직 재료가 부족해요");
                }
		    cm.dispose();
          } else if (selection == 19) {
                if (cm.haveItem(4000364, 550) && cm.haveItem(4000365, 550)) {
		var leftslot3 = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot();
               if (leftslot3 < 3) {
                   cm.sendOk("인벤토리 공간이 최소한 5칸은 필요합니다. 장비 탭의 공간을 3칸이상 비워주신 후 다시 열어주세요.");
                   cm.dispose();
                   return;
               }
                    cm.gainhorong(1122118);
                    cm.gainItem(4000364, -550);
                    cm.gainItem(4000365, -550);
                    cm.sendOk("원하시던 물건이 맞으신가요?");
                } else {
                    cm.sendOk("#b#v 4000364# #v 4000365##k 아직 재료가 부족해요");
                }
		    cm.dispose();
          } else if (selection == 60) {
                if (cm.haveItem(4033302, 1) && cm.haveItem(4033303, 1) && cm.haveItem(4033304, 1)  && cm.haveItem(4033311, 1)  && cm.haveItem(4033312, 1)  && cm.haveItem(4000659, 1)) {
                            var scroll = new Array(1482169,1532099,1522095,1492180,1302276,1472215,1452206,1462194,1442224,1432168,1422141,1412136,1402197,1382209,1372178,1362091,1342083,1332226,1322204,1312154,1242063,1212065,1222060,1232058,1242062);
        var itemid = scroll[Math.floor(Math.random() * scroll.length)];
                   cm.gainItem(itemid,1,true);
                    cm.gainItem(4033302, -1);
                    cm.gainItem(4033303, -1);
                    cm.gainItem(4033304, -1);
                    cm.gainItem(4033311, -1);
                    cm.gainItem(4033312, -1);
                    cm.gainItem(4000659, -1);
                    cm.sendOk("원하시던 물건이 맞으신가요?");
                } else {
                    cm.sendOk("재료가 부족합니다.");
                }
		    cm.dispose();
          } else if (selection == 18) {
                if (cm.haveItem(4000440, 550)) {
		var leftslot3 = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot();
               if (leftslot3 < 3) {
                   cm.sendOk("인벤토리 공간이 최소한 5칸은 필요합니다. 장비 탭의 공간을 3칸이상 비워주신 후 다시 열어주세요.");
                   cm.dispose();
                   return;
               }
                    cm.gainhorong(1032101);
                    cm.gainItem(4000440, -550);
                    cm.sendOk("원하시던 물건이 맞으신가요?");
                } else {
                    cm.sendOk("#b#v 4000440##k 아직 재료가 부족해요");
                }
		    cm.dispose();
          } else if (selection == 17) {
                if (cm.haveItem(4000180, 550) && cm.haveItem(4000181, 550)) {
		var leftslot3 = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot();
               if (leftslot3 < 3) {
                   cm.sendOk("인벤토리 공간이 최소한 5칸은 필요합니다. 장비 탭의 공간을 3칸이상 비워주신 후 다시 열어주세요.");
                   cm.dispose();
                   return;
               }
                    cm.gainhorong(1022123);
                    cm.gainItem(4000180, -550);
                    cm.gainItem(4000181, -550);
                    cm.sendOk("원하시던 물건이 맞으신가요?");
                } else {
                    cm.sendOk("#b#v 4000180# #v 4000181##k 아직 재료가 부족해요");
                }
		    cm.dispose();
          } else if (selection == 16) {
                if (cm.haveItem(4000458, 300)) {
		var leftslot3 = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot();
               if (leftslot3 < 3) {
                   cm.sendOk("인벤토리 공간이 최소한 5칸은 필요합니다. 장비 탭의 공간을 3칸이상 비워주신 후 다시 열어주세요.");
                   cm.dispose();
                   return;
               }
                    cm.gainhorong(1112594);
                    cm.gainItem(4000458, -300);
                    cm.sendOk("원하시던 물건이 맞으신가요?");
                } else {
                    cm.sendOk("#b#v 4000458##k 아직 재료가 부족해요");
                }
		    cm.dispose();
      }
    }
  }
}
