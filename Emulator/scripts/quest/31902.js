importPackage(Packages.server.quest);

var status = -1;

function start(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        qm.dispose();
        return;
    } else {
        status++;
        if (status == 0) {
qm.sendOk("그럼 부탁드릴게요. 도대체 이런 악몽을 메이플 월드에 흘려보내는 #r적#k의 목적은 무엇일까요...?\r\n\r\n#e#b(미래의 문 너머, 황혼의 페리온으로 가보자)");
qm.dispose();
}
}
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
qm.sendOk("잘 왔네, 아주 잘 왔어. 어디서부터 이야기하면 좋을까... 생각을 정리할 테니 다시 한 번 말을 걸어주게.");
qm.dispose();
}
}
}