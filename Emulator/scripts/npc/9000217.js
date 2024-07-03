importPackage(java.io);
importPackage(Packages.client.items);
importPackage(Packages.server.items);
importPackage(Packages.constants);
var status = -1;
    bok9arr1 = [];
    bok9arr2 = [];
    bok9arr3 = [];
    bok9arr4 = [];
    bok9arr5 = [];
    bok9arr6 = [];
    bok9arr7 = [];
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
        a = new Date();
        cm.sendSimple("#e<장비 백업>#n\r\n\r\n"
                     +"아이템 장비 탭에 있는 장비 아이템들을 서버에 저장합니다.\r\n\r\n"
                     +"#r#e[유의사항]#k#n\r\n"
                     +"장비백업을 여러번 할 경우, #b기존에 백업된 파일은 자동으로 삭제#k되니 유의하시길 바랍니다."
                     +"\r\n\r\n#L0# #d장비를 백업하겠습니다.\r\n"
                     +"#L1# 백업된 장비를 불러오겠습니다.\r\n     (장비 및 착용된 아이템이 초기화됩니다.)")
    } else if (status == 1) {
        if (selection == 0) {
            말 = "백업되는 장비의 종류는 아래와 같습니다.\r\n\r\n"
            말+= "#e[장착]#n\r\n"
            for (i=0; i>-199; i--) {
                Chr = cm.getInventory(-1).getItem(i)
                if (Chr != null) {
                    말+= "#i" + Chr.getItemId()+"#";
                }
            }
            말+= "\r\n\r\n#e[장비]#n\r\n"
            for (i=0; i<cm.getInventory(1).getSlotLimit(); i++) {
                Eqp = cm.getInventory(1).getItem(i)
                if (Eqp != null) {
                    말+= "#i" + Eqp.getItemId()+"#";
                }
            }
            말+= "\r\n\r\n#e[소비]#n\r\n"
            for (a=0; a<cm.getInventory(2).getSlotLimit(); a++) {
                Cos = cm.getInventory(2).getItem(a)
                if (Cos != null) {
                    말+= "#i" + Cos.getItemId()+"#";
                }
            }
            말+= "\r\n\r\n#e[기타]#n\r\n"
            for (b=0; b<cm.getInventory(4).getSlotLimit(); b++) {
                Etc = cm.getInventory(4).getItem(b)
                if (Etc != null) {
                    말+= "#i" + Etc.getItemId()+"#";
                }
            }
            말+= "\r\n\r\n#e[설치]#n\r\n"
            for (c=0; c<cm.getInventory(3).getSlotLimit(); c++) {
                Ist = cm.getInventory(3).getItem(c)
                if (Ist != null) {
                    말+= "#i" + Ist.getItemId()+"#";
                }
            }
            말+= "\r\n\r\n#e[캐시]#n\r\n"
            for (d=0; d<cm.getInventory(5).getSlotLimit(); d++) {
                Cas = cm.getInventory(5).getItem(d)
                if ((Cas != null) && !GameConstants.isPet(Cas.getItemId())) {
                    말+= "#i" + Cas.getItemId()+"#";
                }
            }
            말+= "\r\n\r\n#e[펫]#n\r\n"
            for (e=0; e<cm.getInventory(5).getSlotLimit(); e++) {
                Pet = cm.getInventory(5).getItem(e)
                if ((Pet != null) && GameConstants.isPet(Pet.getItemId())) {
                    말+= "#i" + Pet.getItemId()+"#";
                }
            }
            말 += "\r\n#d#L0# 장비 백업을 시작하겠습니다."
            cm.sendSimple(말);
        } else {
            fFile1 = new File("Log/backup/Eqp/Backup_"+cm.getPlayer().getId()+".log");
            fFile2 = new File("Log/backup/Consume/Backup_"+cm.getPlayer().getId()+".log");
            fFile3 = new File("Log/backup/Etc/Backup_"+cm.getPlayer().getId()+".log");
            fFile4 = new File("Log/backup/Install/Backup_"+cm.getPlayer().getId()+".log");
            fFile5 = new File("Log/backup/Cash/Backup_"+cm.getPlayer().getId()+".log");
            fFile6 = new File("Log/backup/Pet/Backup_"+cm.getPlayer().getId()+".log");
            fFile7 = new File("Log/backup/Chr/Backup_"+cm.getPlayer().getId()+".log");
            if (cm.getPlayer().getKeyValue("permission_bok9") != 1) {
                cm.sendOk("해당 캐릭터는 복구가 허락되지 않았습니다.\r\n\r\n자세한 사항은 운영자에게 문의해 주세요.");
                cm.dispose();
            } else if (!fFile1.exists() && !fFile2.exists() && !fFile3.exists() && !fFile4.exists() && !fFile5.exists() && !fFile6.exists() && !fFile7.exists()) {
                cm.sendOk("해당 캐릭터의 장비백업 파일이 존재하지 않습니다.\r\n\r\n장비를 제대로 백업하셨는지 확인해 주세요.")
	        cm.dispose();
            } else {

                 infile1 = new BufferedReader(new FileReader(fFile1));
		 put = "";
		 msg = "";
		 while ((put = infile1.readLine()) != null) {
    		     if (!msg.contains("\r\n" + put)) {
                         msg += "\r\n" + put;
                     }
		 }
                 infile1.close();
                 msg = msg.replace(/'/g, '\"');
                 bok9arr1.push(msg);
                 bok9arr1 = JSON.parse(bok9arr1);

                 infile2 = new BufferedReader(new FileReader(fFile2));
		 put = "";
		 msg = "";
		 while ((put = infile2.readLine()) != null) {
    		     if (!msg.contains("\r\n" + put)) {
                         msg += "\r\n" + put;
                     }
		 }
                 infile2.close();
                 msg = msg.replace(/'/g, '\"');
                 bok9arr2.push(msg);
                 bok9arr2 = JSON.parse(bok9arr2);

                 infile3 = new BufferedReader(new FileReader(fFile3));
		 put = "";
		 msg = "";
		 while ((put = infile3.readLine()) != null) {
    		     if (!msg.contains("\r\n" + put)) {
                         msg += "\r\n" + put;
                     }
		 }
                 infile3.close();
                 msg = msg.replace(/'/g, '\"');
                 bok9arr3.push(msg);
                 bok9arr3 = JSON.parse(bok9arr3);

                 infile4 = new BufferedReader(new FileReader(fFile4));
		 put = "";
		 msg = "";
		 while ((put = infile4.readLine()) != null) {
    		     if (!msg.contains("\r\n" + put)) {
                         msg += "\r\n" + put;
                     }
		 }
                 infile4.close();
                 msg = msg.replace(/'/g, '\"');
                 bok9arr4.push(msg);
                 bok9arr4 = JSON.parse(bok9arr4);

                 infile5 = new BufferedReader(new FileReader(fFile5));
		 put = "";
		 msg = "";
		 while ((put = infile5.readLine()) != null) {
    		     if (!msg.contains("\r\n" + put)) {
                         msg += "\r\n" + put;
                     }
		 }
                 infile5.close();
                 msg = msg.replace(/'/g, '\"');
                 bok9arr5.push(msg);
                 bok9arr5 = JSON.parse(bok9arr5);

                 infile6 = new BufferedReader(new FileReader(fFile6));
		 put = "";
		 msg = "";
		 while ((put = infile6.readLine()) != null) {
    		     if (!msg.contains("\r\n" + put)) {
                         msg += "\r\n" + put;
                     }
		 }
                 infile6.close();
                 msg = msg.replace(/'/g, '\"');
                 bok9arr6.push(msg);
                 bok9arr6 = JSON.parse(bok9arr6);

                 infile7 = new BufferedReader(new FileReader(fFile7));
		 put = "";
		 msg = "";
		 while ((put = infile7.readLine()) != null) {
    		     if (!msg.contains("\r\n" + put)) {
                         msg += "\r\n" + put;
                     }
		 }
                 infile7.close();
                 msg = msg.replace(/'/g, '\"');
                 bok9arr7.push(msg);
                 bok9arr7 = JSON.parse(bok9arr7);

                 말 = "#b#e캐릭터 코드#k#n : " + bok9arr1[0] +"\r\n";
                 말+= "#b#e백업 기준일#k#n : " + bok9arr1[1] + "\r\n"
                 말+= "#b#e검색된 백업 파일 종류#k#n : "
                 if (fFile1.exists()) {
                    말+= "장비 "
                 }
                 if (fFile2.exists()) {
                    말+= "소비 "
                 }
                 if (fFile3.exists()) {
                    말+= "기타 "
                 }
                 if (fFile4.exists()) {
                    말+= "설치 "
                 }
                 if (fFile5.exists()) {
                    말+= "캐시 "
                 }
                 if (fFile6.exists()) {
                    말+= "펫 "
                 }
                 if (fFile7.exists()) {
                    말+= "장착 "
                 }
                 말+= "\r\n\r\n복구를 시작하시겠습니까?\r\n\r\n";
                 말+= "#d#L1# 복구를 시작하겠습니다."
                 cm.sendSimple(말);
            }
        }
    } else if (status == 2) {
       if (selection == 0) {
           a = new Date();

           // 장비백업 시작

           fFile1 = new File("Log/backup/Eqp/Backup_"+cm.getPlayer().getId()+".log");
           if (!fFile1.exists()) {
               fFile1.createNewFile();
           }
               out1 = new FileOutputStream("Log/backup/Eqp/Backup_"+cm.getPlayer().getId()+".log",false);
           msg = "['"
           msg+= cm.getPlayer().getId()
           msg+= "', "
           msg+= "'"+a.getFullYear()+"년 " + Number(a.getMonth() + 1) + "월 " + a.getDate() + "일'"
           for (i=0; i<cm.getInventory(1).getSlotLimit(); i++) {
               Eqp = cm.getInventory(1).getItem(i)
               if (Eqp != null) {
                   msg+= ", [" + Eqp.getItemId() + ", "
                   msg+= Eqp.getStr() + ", "
                   msg+= Eqp.getDex() + ", "
                   msg+= Eqp.getInt() + ", "
                   msg+= Eqp.getLuk() + ", "
                   msg+= Eqp.getHp() + ", "
                   msg+= Eqp.getMp() + ", "
                   msg+= Eqp.getWatk() + ", "
                   msg+= Eqp.getMatk() + ", "
                   msg+= Eqp.getWdef() + ", "
                   msg+= Eqp.getMdef() + ", "
                   msg+= Eqp.getAcc() + ", "
                   msg+= Eqp.getAvoid() + ", "
                   msg+= Eqp.getSpeed() + ", "
                   msg+= Eqp.getJump() + ", "
                   msg+= Eqp.getLevel() + ", "
                   msg+= Eqp.getUpgradeSlots() + ", "
                   msg+= Eqp.getEnhance() + ", "
                   msg+= Eqp.getBossDamage() + ", "
                   msg+= Eqp.getIgnoreWdef() + ", "
                   msg+= Eqp.getAllDamageP() + ", "
                   msg+= Eqp.getAllStatP() + ", "
                   msg+= Eqp.getDownLevel() + ", "
                   msg+= Eqp.getState() + ", "
                   msg+= Eqp.getPotential1() + ", "
                   msg+= Eqp.getPotential2() + ", "
                   msg+= Eqp.getPotential3() + ", "
                   msg+= Eqp.getPotential4() + ", "
                   msg+= Eqp.getPotential5() + ", "
                   msg+= Eqp.getPotential6() + "] "
                }
            } 
            msg+= "]"
            out1.write(msg.getBytes());
            out1.close();

            // 장비백업 끝
            // 소비백업 시작

           fFile2 = new File("Log/backup/Consume/Backup_"+cm.getPlayer().getId()+".log");
           if (!fFile2.exists()) {
               fFile2.createNewFile();
           }
               out2 = new FileOutputStream("Log/backup/Consume/Backup_"+cm.getPlayer().getId()+".log",false);
           msg = "['"
           msg+= cm.getPlayer().getId()
           msg+= "', "
           msg+= "'"+a.getFullYear()+"년 " + Number(a.getMonth() + 1) + "월 " + a.getDate() + "일'"
           for (b=0; b<cm.getInventory(2).getSlotLimit(); b++) {
               Cos = cm.getInventory(2).getItem(b)
               if (Cos != null) {
                   msg+= ", [" + Cos.getItemId() + ", "
                   msg+= Cos.getQuantity() + "] "
                }
            } 
            msg+= "]"
            out2.write(msg.getBytes());
            out2.close();

            // 소비백업 끝
            // 기타백업 시작

	   fFile3 = new File("Log/backup/Etc/Backup_"+cm.getPlayer().getId()+".log");
           if (!fFile3.exists()) {
               fFile3.createNewFile();
           }
               out3 = new FileOutputStream("Log/backup/Etc/Backup_"+cm.getPlayer().getId()+".log",false);
           msg = "['"
           msg+= cm.getPlayer().getId()
           msg+= "', "
           msg+= "'"+a.getFullYear()+"년 " + Number(a.getMonth() + 1) + "월 " + a.getDate() + "일'"
           for (c=0; c<cm.getInventory(4).getSlotLimit(); c++) {
               Etc = cm.getInventory(4).getItem(c)
               if (Etc != null) {
                   msg+= ", [" + Etc.getItemId() + ", "
                   msg+= Etc.getQuantity() + "] "
                }
            } 
            msg+= "]"
            out3.write(msg.getBytes());
            out3.close();

            // 기타백업 끝
            // 설치백업 시작

           fFile4 = new File("Log/backup/Install/Backup_"+cm.getPlayer().getId()+".log");
           if (!fFile4.exists()) {
               fFile4.createNewFile();
           }
               out4 = new FileOutputStream("Log/backup/Install/Backup_"+cm.getPlayer().getId()+".log",false);
           msg = "['"
           msg+= cm.getPlayer().getId()
           msg+= "', "
           msg+= "'"+a.getFullYear()+"년 " + Number(a.getMonth() + 1) + "월 " + a.getDate() + "일'"
           for (d=0; d<cm.getInventory(3).getSlotLimit(); d++) {
               Ins = cm.getInventory(3).getItem(d)
               if (Ins != null) {
                   msg+= ", [" + Ins.getItemId() + ", "
                   msg+= Ins.getQuantity() + "] "
                }
            } 
            msg+= "]"
            out4.write(msg.getBytes());
            out4.close();

            // 설치백업 끝
            // 캐시백업 시작

           fFile5 = new File("Log/backup/Cash/Backup_"+cm.getPlayer().getId()+".log");
           if (!fFile5.exists()) {
               fFile5.createNewFile();
           }
               out5 = new FileOutputStream("Log/backup/Cash/Backup_"+cm.getPlayer().getId()+".log",false);
           msg = "['"
           msg+= cm.getPlayer().getId()
           msg+= "', "
           msg+= "'"+a.getFullYear()+"년 " + Number(a.getMonth() + 1) + "월 " + a.getDate() + "일'"
           for (e=0; e<cm.getInventory(5).getSlotLimit(); e++) {
               Cas = cm.getInventory(5).getItem(e)
               if ((Cas != null) && !GameConstants.isPet(Cas.getItemId())) {
                   msg+= ", [" + Cas.getItemId() + ", "
                   msg+= Cas.getQuantity() + "] "
                }
            } 
            msg+= "]"
            out5.write(msg.getBytes());
            out5.close();

            // 캐시백업 끝
            // 펫백업 시작

           fFile6 = new File("Log/backup/Pet/Backup_"+cm.getPlayer().getId()+".log");
           if (!fFile6.exists()) {
               fFile6.createNewFile();
           }
               out6 = new FileOutputStream("Log/backup/Pet/Backup_"+cm.getPlayer().getId()+".log",false);
           msg = "['"
           msg+= cm.getPlayer().getId()
           msg+= "', "
           msg+= "'"+a.getFullYear()+"년 " + Number(a.getMonth() + 1) + "월 " + a.getDate() + "일'"
           for (e=0; e<cm.getInventory(5).getSlotLimit(); e++) {
               Pet = cm.getInventory(5).getItem(e)
               if ((Pet != null) && GameConstants.isPet(Pet.getItemId())) {
                   msg+= ", [" + Pet.getItemId() + ", "
                   msg+= Pet.getQuantity() + "] "
                }
            } 
            msg+= "]"
            out6.write(msg.getBytes());
            out6.close();

            // 펫백업 끝
            // 장착아이템 백업 시작
           fFile7 = new File("Log/backup/Chr/Backup_"+cm.getPlayer().getId()+".log");
           if (!fFile7.exists()) {
               fFile7.createNewFile();
           }
               out7 = new FileOutputStream("Log/backup/Chr/Backup_"+cm.getPlayer().getId()+".log",false);
           msg = "['"
           msg+= cm.getPlayer().getId()
           msg+= "', "
           msg+= "'"+a.getFullYear()+"년 " + Number(a.getMonth() + 1) + "월 " + a.getDate() + "일'"
           for (f=0; f>-199; f--) {
               Chr = cm.getInventory(-1).getItem(f)
               if (Chr != null) {
                   msg+= ", [" + Chr.getItemId() + ", "
                   msg+= Chr.getStr() + ", "
                   msg+= Chr.getDex() + ", "
                   msg+= Chr.getInt() + ", "
                   msg+= Chr.getLuk() + ", "
                   msg+= Chr.getHp() + ", "
                   msg+= Chr.getMp() + ", "
                   msg+= Chr.getWatk() + ", "
                   msg+= Chr.getMatk() + ", "
                   msg+= Chr.getWdef() + ", "
                   msg+= Chr.getMdef() + ", "
                   msg+= Chr.getAcc() + ", "
                   msg+= Chr.getAvoid() + ", "
                   msg+= Chr.getSpeed() + ", "
                   msg+= Chr.getJump() + ", "
                   msg+= Chr.getLevel() + ", "
                   msg+= Chr.getUpgradeSlots() + ", "
                   msg+= Chr.getEnhance() + ", "
                   msg+= Chr.getBossDamage() + ", "
                   msg+= Chr.getIgnoreWdef() + ", "
                   msg+= Chr.getAllDamageP() + ", "
                   msg+= Chr.getAllStatP() + ", "
                   msg+= Chr.getDownLevel() + ", "
                   msg+= Chr.getState() + ", "
                   msg+= Chr.getPotential1() + ", "
                   msg+= Chr.getPotential2() + ", "
                   msg+= Chr.getPotential3() + ", "
                   msg+= Chr.getPotential4() + ", "
                   msg+= Chr.getPotential5() + ", "
                   msg+= Chr.getPotential6() + "] "
                }
            } 
            msg+= "]"
            out7.write(msg.getBytes());
            out7.close();

            // 장착아이템 백업 끝

            cm.sendOk("백업이 완료되었습니다")
            cm.dispose();
        } else {
            for (a=0; a<cm.getInventory(1).getSlotLimit(); a++) {
               if (cm.getInventory(1).getItem(a) != null) {
                   InventoryManipulator.removeFromSlot(cm.getClient(), MapleInventoryType.EQUIP, a, cm.getInventory(1).getItem(a).getQuantity(), false);
               }
            }
            for (b=0; b<cm.getInventory(2).getSlotLimit(); b++) {
               if (cm.getInventory(2).getItem(b) != null) {
                   InventoryManipulator.removeFromSlot(cm.getClient(), MapleInventoryType.USE, b, cm.getInventory(2).getItem(b).getQuantity(), false);
               }
            }
            for (c=0; c<cm.getInventory(4).getSlotLimit(); c++) {
               if (cm.getInventory(4).getItem(c) != null) {
                   InventoryManipulator.removeFromSlot(cm.getClient(), MapleInventoryType.ETC, c, cm.getInventory(4).getItem(c).getQuantity(), false);
               }
            }
            for (e=0; e<cm.getInventory(3).getSlotLimit(); e++) {
               if (cm.getInventory(3).getItem(e) != null) {
                   InventoryManipulator.removeFromSlot(cm.getClient(), MapleInventoryType.SETUP, e, cm.getInventory(3).getItem(e).getQuantity(), false);
               }
            }
            for (f=0; f<cm.getInventory(5).getSlotLimit(); f++) {
               if (cm.getInventory(5).getItem(f) != null) {
                   InventoryManipulator.removeFromSlot(cm.getClient(), MapleInventoryType.CASH, f, cm.getInventory(5).getItem(f).getQuantity(), false);
               }
            }
            for (i=0; i>-199; i--) {
               if (cm.getInventory(-1).getItem(i) != null) {
		   InventoryManipulator.removeFromSlot(cm.getClient(), MapleInventoryType.EQUIPPED, i, cm.getInventory(-1).getItem(i).getQuantity(), false);
               }
               
            }

            for (h=0; h<bok9arr1.length - 2; h++) {
                realitem = Packages.server.items.ItemInformation.getInstance().getEquipById(bok9arr1[Number(h+2)][0]);
                realitem.setStr(bok9arr1[Number(h+2)][1])
                realitem.setDex(bok9arr1[Number(h+2)][2])
                realitem.setInt(bok9arr1[Number(h+2)][3])
                realitem.setLuk(bok9arr1[Number(h+2)][4])
                realitem.setHp(bok9arr1[Number(h+2)][5])
                realitem.setMp(bok9arr1[Number(h+2)][6])
                realitem.setWatk(bok9arr1[Number(h+2)][7])
                realitem.setMatk(bok9arr1[Number(h+2)][8])
                realitem.setWdef(bok9arr1[Number(h+2)][9])
                realitem.setMdef(bok9arr1[Number(h+2)][10])
                realitem.setAcc(bok9arr1[Number(h+2)][11])
                realitem.setAvoid(bok9arr1[Number(h+2)][12])
                realitem.setSpeed(bok9arr1[Number(h+2)][13])
                realitem.setJump(bok9arr1[Number(h+2)][14])
                realitem.setLevel(bok9arr1[Number(h+2)][15])
                realitem.setUpgradeSlots(bok9arr1[Number(h+2)][16])
                realitem.setEnhance(bok9arr1[Number(h+2)][17])
                realitem.setBossDamage(bok9arr1[Number(h+2)][18])
                realitem.setIgnoreWdef(bok9arr1[Number(h+2)][19])
                realitem.setAllDamageP(bok9arr1[Number(h+2)][20])
                realitem.setAllStatP(bok9arr1[Number(h+2)][21])   
                realitem.setDownLevel(bok9arr1[Number(h+2)][22])
                realitem.setState(bok9arr1[Number(h+2)][23])
                realitem.setPotential1(bok9arr1[Number(h+2)][24])
                realitem.setPotential2(bok9arr1[Number(h+2)][25])
                realitem.setPotential3(bok9arr1[Number(h+2)][26])
                realitem.setPotential4(bok9arr1[Number(h+2)][27])
                realitem.setPotential5(bok9arr1[Number(h+2)][28])
                realitem.setPotential6(bok9arr1[Number(h+2)][29])
                realitem.setOwner(cm.getPlayer().getName());
                InventoryManipulator.addFromDrop(cm.getClient(),realitem,true);
            }
            for (d=0; d<bok9arr7.length - 2; d++) {
                realitem2 = Packages.server.items.ItemInformation.getInstance().getEquipById(bok9arr7[Number(d+2)][0]);
                realitem2.setStr(bok9arr7[Number(d+2)][1])
                realitem2.setDex(bok9arr7[Number(d+2)][2])
                realitem2.setInt(bok9arr7[Number(d+2)][3])
                realitem2.setLuk(bok9arr7[Number(d+2)][4])
                realitem2.setHp(bok9arr7[Number(d+2)][5])
                realitem2.setMp(bok9arr7[Number(d+2)][6])
                realitem2.setWatk(bok9arr7[Number(d+2)][7])
                realitem2.setMatk(bok9arr7[Number(d+2)][8])
                realitem2.setWdef(bok9arr7[Number(d+2)][9])
                realitem2.setMdef(bok9arr7[Number(d+2)][10])
                realitem2.setAcc(bok9arr7[Number(d+2)][11])
                realitem2.setAvoid(bok9arr7[Number(d+2)][12])
                realitem2.setSpeed(bok9arr7[Number(d+2)][13])
                realitem2.setJump(bok9arr7[Number(d+2)][14])
                realitem2.setLevel(bok9arr7[Number(d+2)][15])
                realitem2.setUpgradeSlots(bok9arr7[Number(d+2)][16])
                realitem2.setEnhance(bok9arr7[Number(d+2)][17])
                realitem2.setBossDamage(bok9arr7[Number(d+2)][18])
                realitem2.setIgnoreWdef(bok9arr7[Number(d+2)][19])
                realitem2.setAllDamageP(bok9arr7[Number(d+2)][20])
                realitem2.setAllStatP(bok9arr7[Number(d+2)][21])   
                realitem2.setDownLevel(bok9arr7[Number(d+2)][22])
                realitem2.setState(bok9arr7[Number(d+2)][23])
                realitem2.setPotential1(bok9arr7[Number(d+2)][24])
                realitem2.setPotential2(bok9arr7[Number(d+2)][25])
                realitem2.setPotential3(bok9arr7[Number(d+2)][26])
                realitem2.setPotential4(bok9arr7[Number(d+2)][27])
                realitem2.setPotential5(bok9arr7[Number(d+2)][28])
                realitem2.setPotential6(bok9arr7[Number(d+2)][29])
                realitem2.setOwner(cm.getPlayer().getName());
                InventoryManipulator.addFromDrop(cm.getClient(),realitem2,true);
            }
            for (j=0; j<bok9arr2.length - 2; j++) {
                cm.gainItem(bok9arr2[Number(j+2)][0],bok9arr2[Number(j+2)][1]);
            }

            for (k=0; k<bok9arr3.length - 2; k++) {
                cm.gainItem(bok9arr3[Number(k+2)][0],bok9arr3[Number(k+2)][1]);
            }

            for (l=0; l<bok9arr4.length - 2; l++) {
                cm.gainItem(bok9arr4[Number(l+2)][0],bok9arr4[Number(l+2)][1]);
            }

            for (m=0; m<bok9arr5.length - 2; m++) {
                cm.gainItem(bok9arr5[Number(m+2)][0],bok9arr5[Number(m+2)][1]);
            }

            for (n=0; n<bok9arr6.length - 2; n++) {
                cm.BuyPET(bok9arr6[Number(n+2)][0])
            }

            cm.updateChar();
            cm.fakeRelog();
            cm.getPlayer().setKeyValue("permission_bok9",null)
            cm.sendOk("복구가 완료되었습니다.");
            cm.dispose();
        }
    }
}