var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    mobarraylist = ["1210100","1150001","0150001","2230107","2220100","2100107","2150003","2400100","4110302","4230102",
                    "4230112", "3401007", "3401003"]
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        if (cm.getPlayer().getKeyValue("maplemon_mobcode") == null) {
            선택 = 0;
            말 = "#fn나눔고딕 Extrabold# 아직 메이플몬이 없으시군요! 제가 랜덤으로 한개 드리도록 하죠! 과연 당신의 메이플몬은 무엇일까요?\r\n\r\n"
            mobarrayrandom = mobarraylist[Math.floor(Math.random() * mobarraylist.length)];
            말+= "　　　　　　　　　　#fMob/"+mobarrayrandom+".img/stand/0#\r\n\r\n"
            말+= "#fn나눔고딕 Extrabold# 이 메이플몬의 이름을 지어주시겠어요?\r\n#b(메이플몬의 이름은 4자로 지어주세요.)#k"
            cm.sendGetText(말);
        } else {
            cm.sendOk("#r#e※메이플몬을 키우는 방법 및 주의사항※#n#k\r\n\r\n"
                           +"1. 메이플몬은 #i4032862##z4032862#만 섭취합니다.\r\n" 
                           +"2. 메이플몬이 #z4032862#을 섭취하면, EXP를 얻습니다.\r\n"
                           +"3. 메이플몬이 일정 EXP를 달성하면, 레벨업을 합니다.\r\n"
                           +"4. 메이플몬이 일정 레벨을 달성하면, 진화를 합니다.\r\n(탱커 혹은 딜러로 진화방향을 선택할 수 있습니다.)\r\n"
                           +"5. 레벨업 및 진화를 할시 공격력 및 체력이 증가합니다.\r\n"
                           +"6. 자신의 메이플몬으로 다른 유저와 배틀이 가능합니다.");
            cm.dispose();
        }
    } else if (status == 1) {
        if (선택 == 0) {
             if (cm.getText().length() == 4) {
                 cm.sendOk("#fn나눔고딕 Extrabold# 와! "+cm.getText()+"라니 정말 좋은 이름이군요!\r\n"
                           +"그럼 제가 이제 트레이너를 드릴테니, 메이플몬을 키우세요\r\n\r\n"
                           +"#r#e※메이플몬을 키우는 방법 및 주의사항※#n#k\r\n\r\n"
                           +"1. 메이플몬은 #i4032862##z4032862#만 섭취합니다.\r\n" 
                           +"2. 메이플몬이 #z4032862#을 섭취하면, EXP를 얻습니다.\r\n"
                           +"3. 메이플몬이 일정 EXP를 달성하면, 레벨업을 합니다.\r\n"
                           +"4. 메이플몬이 일정 레벨을 달성하면, 진화를 합니다.\r\n(탱커 혹은 딜러로 진화방향을 선택할 수 있습니다.)\r\n"
                           +"5. 레벨업 및 진화를 할시 공격력 및 체력이 증가합니다.\r\n"
                           +"6. 자신의 메이플몬으로 다른 유저와 배틀이 가능합니다.");
                 cm.getPlayer().setKeyValue("maplemon_mobname",cm.getText());
                 cm.getPlayer().setKeyValue("maplemon_mobcode",mobarrayrandom);
                 cm.getPlayer().setKeyValue("maplemon_moblevel",1);
                 cm.getPlayer().setKeyValue("maplemon_mobexp",0);
                 cm.getPlayer().setKeyValue("maplemon_currenthp",100)
                 cm.getPlayer().setKeyValue("maplemon_fullhp", 100);
                 cm.getPlayer().setKeyValue("maplemon_hunger",100);
                 cm.getPlayer().setKeyValue("maplemon_hungertime",new Date().getTime());
                 cm.getPlayer().setKeyValue("maplemon_acc1",50);
                 cm.getPlayer().setKeyValue("maplemon_acc2",100);
                 cm.gainItem(2433413, 1);
                 cm.dispose();
             } else {
                 cm.sendOk("메이플몬의 이름은 4자로 해 주셔야해요!");
                 cm.dispose();
            }
        }
    }
}