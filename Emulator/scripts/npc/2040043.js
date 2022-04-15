/*
택시스크립트 파란돌륜군
*/

var status = 0;
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
            var chat = "#b클리어하신걸 환영합니다#k 다음스테이지로 넘어가세요\r\n";
            chat += "\r\n#b#L1#다음스테이지로 넘어가겠습니까 ?#k#l";
                              
            cm.sendSimple(chat);
        } else if (status == 1) {
                var warpmain = "가고싶은 #b맵#k의 종류를 선택해주시면 됩니다\r\n";
                warpmain += "";
                //warpmain += "\r\n#L4##b#fUI/UIToolTip/Item/Equip/Star/Star# #b다른 마을로 이동을 하겠습니다";
                warpmain += "\r\n#L5##fUI/UIToolTip/Item/Equip/Star/Star# #b 다음스테이지로 이동을 하겠습니다"; 
                //warpmain += "\r\n#L7##fUI/UIToolTip/Item/Equip/Star/Star# #b앱솔랩스 코인사냥터으로 이동하겠습니다";
                cm.sendSimple(warpmain);
        } else if (status == 2) {


            if (selection == 4) {
                var vlig = "원하시는 맵을 선택해주시면 이동시켜드리겠습니다\r\n즐거운 여행 되시기를 바랍니다\r\n";
               // vlig += "\r\n#L3000500#낚시터 이동";
                vlig += "\r\n#L104000000#리스항구 이동";
                vlig += "\r\n#L100000000#헤네시스 이동";
                vlig += "\r\n#L103000000#커닝시티 이동";
                vlig += "\r\n#L101000000#엘리니아 이동";
                vlig += "\r\n#L102000000#페리온 이동";
                vlig += "\r\n#L105000000#슬리피우드 이동"; 
                vlig += "\r\n#L130000000#에레브 이동";
                vlig += "\r\n#L101050000#에우렐 이동";
                vlig += "\r\n#L140000000#리엔 이동"; 
                vlig += "\r\n#L200000000#오르비스 이동";
                vlig += "\r\n#L211000000#엘나스 이동"
                vlig += "\r\n#L220000000#루디브리엄 이동";
                vlig += "\r\n#L261000000#지구방위본부 이동";
                vlig += "\r\n#L222000000#아랫마을 이동";
                vlig += "\r\n#L240000000#리프레 이동";
                vlig += "\r\n#L260000000#아리안트 이동";
                vlig += "\r\n#L261000000#마가티아 이동";
                vlig += "\r\n#L252000000#황금사원 이동";
                vlig += "\r\n#L273000000#황혼의 페리온";
                vlig += "\r\n#L301000000#크림슨 우드";
                vlig += "\r\n#L105200000#루타비스 이동";
                vlig += "\r\n#L931050810#판테온 이동";
                vlig += "\r\n#L310070000#헤이븐 이동";
                cm.sendSimple(vlig);

            } else if (selection == 5) {
                var hunt = "#e[WARP]#n #d원하시는 맵#k을 선택해주세요.\r\n";
 var hunt = "#b#h ##k님 환영합니다~♬ 사냥터를 선택해주세요.\r\n\r\n"
              
                hunt += "\r\n#L922010900#엘리샤르 잡으러가기 ";
                cm.sendSimple(hunt);

            } else if (selection == 6) {
                var boss = "";
                     boss += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/1# #k\#L230040410# 바다속 심해의 왕 피아누스\r\n#l"
                      boss += "\r\n #l\n #fUI/UIWindow2.img/MobGage/Mob/8510000# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"   
                    boss += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/2# #k\#L280030100# 심연속 폐광의 군주 카오스 자쿰\r\n#l"
                      boss += "\r\n #l\n #fUI/UIWindow2.img/MobGage/Mob/8800000# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
               boss += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/3# #k\#L240060200# 용의 군주라 불리는 카오스 혼테일"
                     boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8810018# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
                 boss += "k\r\n #fUI/UIWindow2.img/NewPyramid/Number/4# #k\#L211070100# 검은마법사의 수문장 반 레온"
                 boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8840000# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
                 boss += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/5# #k\#L262031300# 아스완의 망령을 다스리는 힐라"
                boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8870000# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]l\r\n"                  
                boss += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/6# #k\#L272020200# 시간을 탈취한자 아카이럼"
                 boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8860000# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
                 boss += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/7# #k\#L271040100# 미래의 여제 시그너스"
                 boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8850011# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
                boss += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/8# #k\#L401060100# 폭군의 왕 매그너스"
                boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8880000# [난이도 :　#e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
                boss += "\r\n#fUI/UIWindow2.img/NewPyramid/Number/9# #k\#L270050100# 미래와 과거의 지배자 카오스 핑크빈"                
                boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8820001# [난이도 :　#e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"              
                cm.sendSimple(boss);

                    } else if (selection == 8) {
                var boss = "";
                   boss += "\r\n#fUI/UIWindow2.img/NewPyramid/Number/1# #k\#L105200529# 또다른 시간의 파괴자 카오스 반반"
                   boss += "\r\n #l\n #fUI/UIWindow2.img/MobGage/Mob/8910100# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
                   boss += "\r\n#fUI/UIWindow2.img/NewPyramid/Number/2# #k\#L105200710# 부서진 여왕 의 분노 카오스 블러디 퀸"
                    boss += "\r\n #l\n #fUI/UIWindow2.img/MobGage/Mob/8920100# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
                  boss += "\r\n#fUI/UIWindow2.img/NewPyramid/Number/3# #k\#L105200610# 파멸의 광기 카오스 피에르"
                 boss += "\r\n #l\n #fUI/UIWindow2.img/MobGage/Mob/8900100# [난이도 : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
               boss += "\r\n#fUI/UIWindow2.img/NewPyramid/Number/4# #k\#L105200810# 종말의 심판자 카오스 벨룸"                
                boss += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8930100# [난이도 :　#e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"              
               cm.sendSimple(boss);   

                    } else if (selection == 7) {
               var hunt = "#b#h ##k님 환영합니다~♬ 앱솔랩스 코인 사냥터 를 선택해주세요.\r\n\r\n"
                hunt += "#r#e[앱솔랩스 코인 사냥터]\r\n#k#n";
                hunt += "#L271030310#(Lv.173) │ #r기사단 요새　　　  #k │ #r무기고1#k\r\n"
                hunt += "#L271030400#(Lv.173) │ #r기사단 요새　　　  #k │ #r기사단 제 4구역#k\r\n"
                hunt += "#L273000000#(Lv.190) │ #b황혼의 페리온　　  #k │ #b황혼의 페리온#k\r\n"
                hunt += "#L273050000#(Lv.197) │ #r황혼의 페리온　　  #k │ #r원주민들의 피난처#k\r\n"
                hunt += "#L241020205#(Lv.203) │ #b크리티아스　　      #k │ #b비극의숲#k\r\n"
                hunt += "#L241020217#(Lv.205) │ #b크리티아스　　      #k │ #b빙점의숲#k\r\n"
                hunt += "#L241020207#(Lv.205) │ #b크리티아스　　      #k │ #b작열의숲#k\r\n"
                hunt += "#L241010227#(Lv.205) │ #b크리티아스　　      #k │ #b암흑의숲#k\r\n"
                hunt += "#L241010226#(Lv.205) │ #b크리티아스　　      #k │ #b마력의숲#k\r\n"
                hunt += "#L310070110#(Lv.210) │ #b기계무덤　　         #k │ #b기계무덤 언덕1#k\r\n"
                hunt += "#L310070150#(Lv.210) │ #b기계무덤　　         #k │ #b기계무덤 공터#k\r\n"
                hunt += "#L310070220#(Lv.215) │ #b스카이라인　　      #k │ #b 가장자리#k\r\n"
                hunt += "#L310070200#(Lv.215) │ #b스카이라인　　      #k │ #b 올라가는길#k\r\n"
                //hunt += "#L310070300#(Lv.222) │ #b블랙헤븐 갑판       #k │ #b 블랙헤븐 갑판 1#k\r\n"
                  cm.sendSimple(hunt);

         
            }  
            } else if (status == 3) {
 var s = selection;
 if(s >=100000000) {
 cm.dispose();
 cm.warp(s,0);
}

            }	
	   	   
      }
}
    
    