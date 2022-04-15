var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1 || mode == 0) {
        cm.sendOk("흥! 정말 예쁘게 될 수 있는 기회였는데")
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
	cm.sendMixHair("2가지 색깔을 믹스해 머리색깔을 변경할 수 있어. 베이스 컬러와 믹스 컬러를 선택하고 스크롤을 움직여 자신만의 색을 만들어 봐", 1012103);
    } else if (status == 1) {
         cm.sendOk("헤어가 잘 염색되었습니다.");
         cm.gainItem(2432946,-1)
         cm.dispose();
    }
}
