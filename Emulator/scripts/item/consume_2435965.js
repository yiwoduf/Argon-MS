importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);
importPackage(Packages.handling.world);
importPackage(Packages.tools.packet);

// 세팅
var status = -1;
var own = 2223
var need = 2435965
var name = "핑크 츄츄고래"
function start() {
    status = -1;!
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
	cm.teachSkill(80000000+own, 1, 0)
	cm.gainItem(need, -1);

	cm.getPlayer().dropMessage(-1, "[스킬] "+name+" 라이딩을 획득 하였습니다.");
	cm.dispose();
	}
}