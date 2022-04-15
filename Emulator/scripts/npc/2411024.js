var select = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            boss = "#fn나눔고딕 Extrablod##fs19##e #b#h0##k보스 원정대 !#b\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L0#마뇽 원정대#r(100이상 입장 가능)#k\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L1##b그리프 원정대#r(100이상 입장 가능)#k\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L2##b피아누스 원정대#r(100이상 입장 가능)#k\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L3##b파폴라투스 원정대#r(100이상 입장 가능)#k\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L4##b자쿰 원정대#r(추가중)#k\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L5##b카오스 자쿰 원정대#r(추가중)#k\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L6##b혼테일 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L7##b카오스 혼테일 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L8##b핑크빈 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L9##b시그너스 원정대#r(100이상 입장 가능)\r\n";
            //boss += "#fn나눔고딕 Extrablod##fs12##L10##b블러디 퀸 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L11##b카오스 블러디 퀸 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L12##b반반 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L13##b카오스 반반 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L14##b붉은 피에르 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L15##b카오스 붉은 피에르 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L16##b벨륨 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L17##b카오스 벨륨 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L18##b힐라 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L19##b위대한 힐라 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L20##b반 레온 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L21##b매그너스 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L22##b아카이럼 원정대#r(100이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L23##b불꽃늑대 원정대#r(220이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L24##b스우 원정대#r(220이상 입장 가능)\r\n";
            //boss += "#fn나눔고딕 Extrablod##fs12##L25##b루시드 원정대#r(220이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L26##b데미안 원정대#r(220이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L27##b악령 원정대#r(220이상 입장 가능)\r\n";
            boss += "#fn나눔고딕 Extrablod##fs12##L28##b우르스 원정대#r(220이상 입장 가능)\r\n";


            cm.sendSimple(boss);              
        } else if (status == 1) {
            if (selection >= 0) {
                cm.ChaosBossSpawn(selection);
                cm.dispose();
            } else {
                cm.dispose();
            }
        }
    }
}
