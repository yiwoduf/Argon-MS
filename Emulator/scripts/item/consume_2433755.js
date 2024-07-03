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
       cm.sendSimple("원하는 항목을 선택해 주세요.\r\n\r\n#L0#getKeyValue_User\r\n#L1#setKeyValue_User\r\n#L2#복구허락")
    } else if (status == 1) {
       선택 = selection;
       cm.sendGetText("유저 이름을 적어주세요.");
    } else if (status == 2) {
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
               cm.sendGetText("What KeyValue should I Get for you?");
           } else if (선택 == 1) {
               cm.sendGetText("What KeyValue should I Set for you?");
           }
       } else {
            cm.sendOk("입력하신 캐릭터가 같은 채널에 접속중이지 않습니다.");
            cm.dispose();
       }
    } else if (status == 3) {
       if (선택 == 0) {
           cm.sendOk("타겟 : "+target+"\r\n키벨류 이름 : "+cm.getText()+"\r\n키벨류 값"+target.getKeyValue(""+cm.getText()+"")+"");
           cm.dispose();
       } else {
           skv = cm.getText();
           cm.sendGetText("Put the exact value you want to set");
       }
    } else if (status == 4) {
       target.setKeyValue(""+skv+"",cm.getText());
       cm.sendOk("Success");
       cm.dispose();

    }
}