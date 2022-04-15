/*
 * @Author 바이러스(v_ir_us@nate.com)
 * SystemSQL - MYSQL 로 바꾸시고, sendHint 오류나면 cm.sendOk로 변경해주세요.
 */
importPackage(Packages.database);
importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.packet.creators);

var time = new Date();
var year = time.getFullYear();
var month = time.getMonth();
var date = time.getDate();
if (month < 10) {    month = "0"+month;}
if (date < 10) {    date = "0"+date;}
var today = year+"년 "+month+"월 "+date+"일";
        
function start() {
    createAccount();
    status = -1;
    cm.sendSimple("마인드 은행입니다. 무엇을 하시겠습니까?.\r\n#r(#h #님의 통장잔액 : #d"+getAccount(cm.getPlayer().getName(),1)+"#r 메소)\r\n#b#L1#입금 #L2#출금 #L3#송금 #L4#내역 #L10#이자 #e#r#L5#초기화");
}

function action(mode,type,selection) {
    if (mode == 1) {
        status++;
    }
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (selection == 1) {
            cm.sendGetNumber("입금할 액수를 입력해주세요. (한 번 입금 최대 액수 - 20억)",1,1,2000000000);
        } else if (selection == 2) {
            cm.sendGetNumber("출금할 액수를 입력해주세요. (한 번 출금 최대 액수 - 20억)",1,1,2000000000);
        } else if (selection == 3) {
            cm.sendGetText("누구에게 보내시겠습니까?\r\n#r(주의 : 은행에 해당 이름이 없을 시에는 송금이 불가능합니다.)");
        } else if (selection == 4) {
            getHistory();
        } else if (selection == 5) {
            cm.sendYesNo("정말 초기화하겠습니까? 계속 진행하시려면 예를 눌러주세요.");
        } else if (selection == 10) {
            var time = getAccount(cm.getPlayer().getName(),3);
            time = time > 0 ? System.currentTimeMillis() - time : 0;
            time /= 1000;
            var sec = time % 60; // 초
	var total = (time - sec); // 초로 환산 한 상태에서 초 값만 뺌
	var min = (total / 60) % 60; // 분
	var hour = Math.floor((total - (sec + min)) / 3600); // 시간
	hour = hour % 24;
        hour = hour == -1 ? 0 : hour;
	var day = Math.floor(time / (60 * 60 * 24));
        sec = Math.floor(sec);
            if (time == 0) {
                sendHint("최초 입금시 시간이 기록됩니다.",250,20);
                cm.dispose();
            } else {
                var text = "#h #님의 최초 입금 시간 : #b"+day+"일 "+hour+"시간 "+min+"분 "+sec+"초\r\n#k";
                text += "이자는 #r5일, 7일, 11일, 15일, 30일#k 간격으로 받으실 수 있으며, 기간이 길수록 늘어나는 양도 커집니다. 그러나, 한 번 받으시면 다시 입금을 하셔야되니, 이 점 유의해주시기 바랍니다.\r\n";
                text += "#b#L99#이자를 받고 싶습니다.\r\n";
                text += "#b#L100#창을 닫겠습니다.";
                cm.sendSimple(text);
            }
            interest = day;
        }
        selected = selection;
    } else if (status == 1) {
        if (selected == 1) {
            money = selection;
            if (cm.getMeso() >= money) {
                cm.sendYesNo("정말 #b"+money+" 메소#k를 입금하시겠습니까?");
            } else {
                cm.sendOk("보유하신 메소보다 높은 액수를 입력하셨습니다.\r\n다시 한 번 입력해주세요.");
                cm.dispose();
            }
        } else if (selected == 2) {
            money = selection;
            if (getAccount(cm.getPlayer().getName(),1) >= money) {
                cm.sendYesNo("정말 #b"+money+" 메소#k를 출금하시겠습니까?");
            } else {
                cm.sendOk("보유하신 잔액보다 높은 액수를 입력하셨습니다.\r\n다시 한 번 입력해주세요.");
                cm.dispose();
            }
        } else if (selected == 3) {
            name = cm.getText();
            checkName(name);
        } else if (selected == 5) {
            var del = MYSQL.getConnection().prepareStatement("DELETE FROM banksystem WHERE name = ?");
            del.setString(1,cm.getPlayer().getName());
            del.executeUpdate();
            sendHint("은행 계정이 삭제되었습니다.",275,20);
            cm.dispose();
        } else if (selected == 10) {
            if (selection == 100) {
                cm.dispose();
            } else if (selection == 99) {
                if (interest < 5) {
                    sendHint("입금을 하신지 5일이 지나지 않았습니다.",250,20);
                    cm.dispose();
                } else {
                     var benefit = interest == 5 && interest == 6 ? 0.05 :
                            interest >= 7 && interest < 11 ? 0.10 :
                            interest >= 11 && interest < 15 ? 0.15 :
                            interest >= 15 && interest < 30 ? 0.25 :
                            interest >= 30 ? 0.35 : 0; 
                    cm.sendYesNo("현재 #h #님의 통장 잔액은 #b"+getAccount(cm.getPlayer().getName(),1)+" 메소#k이며, 추가 이자로#r"+getAccount(cm.getPlayer().getName(),1) * benefit+" ("+benefit+"%) 메소#k를 받게 됩니다. 받으면 시간 기록이 초기화되니 주의해주세요. 이자를 받으시겠습니까?");
                }
                updateMeso = getAccount(cm.getPlayer().getName(),1) * benefit;
            }
        }
    } else if (status == 2) {
        if (selected == 1) {
            updateAccount(cm.getPlayer().getName(),money,today,System.currentTimeMillis(),1);
        } else if (selected == 2) {
            updateAccount(cm.getPlayer().getName(),money,today,0,2);
        } else if (selected == 3) {
            send = selection;
            if (getAccount(cm.getPlayer().getName(),1) >= send) {
                cm.sendYesNo("정말 #d"+name+"#k님에게 #b"+send+" 메소#k를 보내시겠습니까?");
            } else {
                sendHint("보유하신 잔액보다 높은 액수를 입력하셨습니다.\r\n다시 한 번 입력해주세요.",300,30);
            }
        } else if (selected == 10) {
            updateAccount(cm.getPlayer().getName(),updateMeso,today,0,4);
        }
    } else if (status == 3) {
        updateAccount(name,send,today,0,3);
    }
}

function updateAccount(name,money,date,time,mode) {
    if (mode == 1) {
    var ps = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    ps.setString(1,name);
    var rs = ps.executeQuery();
    rs.next();
    if (rs.getLong("time") == 0) {
    var sel = "UPDATE banksystem SET money = ?, date = ?, time = ?, try = ? WHERE name = ?";
    var upd = MYSQL.getConnection().prepareStatement(sel);
    upd.setLong(1,getAccount(name,1) + money);
    upd.setString(2,rs.getString("date")+"/"+date+":"+money+":(입금)");
    upd.setLong(3,time);
    upd.setInt(4,getAccount(name,2) + 1);
    upd.setString(5,name);
    upd.executeUpdate();
    cm.gainMeso(-money);
    sendHint("성공적으로 입금하였습니다.",250,20);
    cm.dispose();
    } else {
        var sel = "UPDATE banksystem SET money = ?, date = ?, try = ? WHERE name = ?";
    var upd = MYSQL.getConnection().prepareStatement(sel);
    upd.setLong(1,getAccount(name,1) + money);
    upd.setString(2,rs.getString("date")+"/"+date+":"+money+":(입금)");
    upd.setInt(3,getAccount(name,2) + 1);
    upd.setString(4,name);
    upd.executeUpdate();
    cm.gainMeso(-money);
    sendHint("성공적으로 입금하였습니다.",250,20);
    cm.dispose();
    }
} else if (mode == 2) {
    var ps = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    ps.setString(1,name);
    var rs = ps.executeQuery();
    rs.next();
    var get = MYSQL.getConnection().prepareStatement("UPDATE banksystem SET money = ?, date = ?, try = ? WHERE name = ?");
    get.setLong(1,getAccount(name,1) - money);
    get.setString(2,rs.getString("date")+"/"+date+":"+money+":(출금)");
    get.setInt(3,getAccount(name,2) + 1);
    get.setString(4,name);
    get.executeUpdate();
    cm.gainMeso(money);
    sendHint("성공적으로 출금하였습니다.",250,20);
    cm.dispose();
} else if (mode == 3) {
    var ps = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    ps.setString(1,name);
    var rs = ps.executeQuery();
    rs.next();
    var send = MYSQL.getConnection().prepareStatement("UPDATE banksystem SET money = ?, date = ?, try = ? WHERE name = ?");
    send.setLong(1,getAccount(name,1) + money);
    send.setString(2,rs.getString("date")+"/"+date+":"+money+":(받음)");
    send.setInt(3,getAccount(name,2) + 1);
    send.setString(4,name);
    send.executeUpdate();
    
    var pse = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    pse.setString(1,cm.getPlayer().getName());
    var rse = pse.executeQuery();
    rse.next();
    var mine = MYSQL.getConnection().prepareStatement("UPDATE bankSystem SET money = ?, date = ?, try = ? WHERE name = ?");
    mine.setLong(1,getAccount(cm.getPlayer().getName(),1) - money);
    mine.setString(2,rse.getString("date")+"/"+date+":"+money+":(송금)");
    mine.setInt(3,getAccount(cm.getPlayer().getName(),2) + 1);
    mine.setString(4,cm.getPlayer().getName());
    mine.executeUpdate();
    sendHint("성공적으로 송금하였습니다. (To. "+name+")",275,20);
    cm.dispose();
} else if (mode == 4) {
    var pse = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    pse.setString(1,cm.getPlayer().getName());
    var rse = pse.executeQuery();
    rse.next();
    var mine = MYSQL.getConnection().prepareStatement("UPDATE bankSystem SET money = ?, date = ?, time = ?, try = ? WHERE name = ?");
    mine.setLong(1,getAccount(name,1) + money);
    mine.setString(2,rse.getString("date")+"/"+date+":"+money+":(이자)")
    mine.setLong(3,time);
    mine.setInt(4,getAccount(name,2) + 1);
    mine.setString(5,name);
    mine.executeUpdate();
    sendHint("성공적으로 이자를 받았습니다. ("+money+" 메소)\r\n시간 기록이 초기화됩니다.",300,30);
    cm.dispose();
}
}

function getAccount(name, mode) {
    var account = 0;
    var sel = "SELECT * FROM banksystem WHERE name = ?";
    var ps = MYSQL.getConnection().prepareStatement(sel);
    ps.setString(1,name);
    var rs = ps.executeQuery();
    rs.next();
    if (mode == 1) {
    account = rs.getLong("money");
} else if (mode == 2) {
    account = rs.getInt("try");
} else if (mode == 3) {
    account = rs.getLong("time");
}
return account;
}

function createAccount() {
    var ps = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    ps.setString(1,cm.getPlayer().getName());
    var rs = ps.executeQuery();
    var isExist = false;
    while (rs.next()) {
        isExist = true;
        continue;
    }
    if (!isExist) {
        var ins = MYSQL.getConnection().prepareStatement("INSERT INTO banksystem(name,money,date,time,try) VALUES(?,?,?,?,?)");
        ins.setString(1,cm.getPlayer().getName());
        ins.setLong(2,0);
        ins.setString(3,today);
        ins.setLong(4,0);
        ins.setInt(5,0);
        ins.executeUpdate();
    }
}

function checkName(name) {
    if (name == cm.getPlayer().getName()) {
        sendHint("자신에게는 보낼 수 없습니다.",250,20);
        cm.dispose();
        return;
    }
    var ps = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    ps.setString(1,name);
    var rs = ps.executeQuery();
    var isExist = false;
    while (rs.next()) {
        isExist = true;
    }
    if (isExist) {
        cm.sendGetNumber("얼마를 보내시겠습니까? (최대 20억 메소 가능)\r\n#r(주의 : 송금을 하면 그만큼 자신의 통장잔고에서 차감됩니다.)",1,1,2000000000);
    } else {
        sendHint("캐릭터를 찾을 수 없습니다.",250,20);
        cm.dispose();
    }
}

function sendHint(message,x,y) {
    return cm.getPlayer().getClient().getSession().write(MainPacketCreator.sendHint(message,x,y));
}

function getHistory() {
    var ps = MYSQL.getConnection().prepareStatement("SELECT * FROM banksystem WHERE name = ?");
    ps.setString(1,cm.getPlayer().getName());
    var rs = ps.executeQuery();
    var string = new StringBuilder();
    rs.next();
    date = rs.getString("date").split("/");
    string.append("통장 생성일 : #n#r").append(date[0]).append("#k\r\n\r\n");
    string.append("#e[번호]        [날짜]            [메소]        [입/출금]#n\r\n")
        for (var i = 1; i < getAccount(cm.getPlayer().getName(),2) + 1; i++) {
            var test = date[i].split(":");
            var money = test[1];
	var len = money.length();
        var zero = "";
        for (var ze = 0; ze < (11 - len); ze++) {
            zero += "#Cgray#0";
        }
        if (test[2] == "(송금)") {
            money = zero+"#r"+money+"";
        } else if (test[2] == "(출금)") {
            money = zero+"#d"+money+"";
        } else {
        money = zero+"#b"+money+"";
    }
        string.append("  #b(").append(Integer(i)).append(")#k     ").append(test[0]).append("     "+money).append("         #r"+test[2]+"\r\n");
    }
    cm.sendOk(string.toString());
    cm.dispose();
}