var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
       cm.sendSimple("원하는 항목을 선택해 주세요.\r\n\r\n#L0#getKeyValue_User (유저의 키벨류 값을 알아온다.)\r\n#L1#setKeyValue_User (유저의 키벨류 값을 설정한다.)\r\n#L2#복구허락\r\n#L3#팅맵복구")
    } else if (status == 1) {
       선택 = selection;
       cm.sendGetText("유저 이름 또는 맵 코드를 적어주세요.\r\n\r\n(팅맵 복구일때는 맵 코드, 다른건 유저 이름)");
    } else if (status == 2) {
     if (선택 == 3) {
        cm.resetMap(cm.getText());
        cm.sendOk("완료.");
        cm.dispose();
     } else {
       if (cm.getText() != cm.getPlayer().getName()) {
           target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getText());
       } else {
           target = cm.getPlayer()
       }
       if (target != null) {
           if (선택 == 2) {
               target.setKeyValue("permission_bok9",1);
               cm.sendOk("복구신청 허가를 성공했습니다.");
               cm.dispose();
           } else if (선택 == 0) {
               cm.sendGetText("원하시는 키벨류의 이름을 적어 주세요.\r\n\r\n(추가 데미지를 보시고 싶으시면 rc_damage를 입력해 주세요.)");
           } else if (선택 == 1) {
               cm.sendGetText("설정하고 싶은 키벨류의 이름을 적어주세요.\r\n\r\n(추가 데미지를 설정하고 싶으시면 rc_damage를 입력해 주세요.)");
           }
       } else {
            cm.sendOk("입력하신 캐릭터가 같은 채널에 접속중이지 않습니다.");
            cm.dispose();
       }
    }
    } else if (status == 3) {
       if (선택 == 0) {
           cm.sendOk("타겟 : "+target+"\r\n키벨류 이름 : "+cm.getText()+"\r\n키벨류 값"+target.getKeyValue(""+cm.getText()+"")+"");
           cm.dispose();
       } else {
           skv = cm.getText();
           cm.sendGetText("설정하실 값을 적어주세요.");
       }
    } else if (status == 4) {
       target.setKeyValue(""+skv+"",cm.getText());
       cm.sendOk("완료.");
       cm.dispose();

    }
}