var status = -1;

 

function start() {
　　　　status = -1;
　　　　action (1, 0, 0);
}

 

function action(mode, type, selection) {
　　　　if (mode != 1) {
　　　　　　　　cm.dispose();
　　　　　　　　return;
　　　　}
　　　　if (mode == 1) {
　　　　　　　　status++;
　　　　}
　　　　if (status == 0) {
　　　　　　　　cm.sendGetText("#b개드립 온라인 에서 닉네임을 잘못설정하셧다면 바꿔드리겟습니다.#k");
　　　　} else if (status == 1) {
　　　　　　　　var name = cm.getText();
　　　　if (name.length() > 2 && name.length() < 6)
　　　　{
　　　　　　　　cm.setName(name);
　　　　　　　　cm.sendOk("#b" + name + "#k으로 닉네임 변경이 완료 되었습니다.");
　　　　　　　　cm.dispose();
　　　　}
　　　　else
　　　　{
　　　　　　　　cm.sendOk("#b2글자 이하 또는 6글자 이상 입니다.#k");
　　　　　　　　cm.dispose();
　　　　　　　　}
　　　　}
}
