importPackage(java.io);
importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);


var LEVEL_RANK  = 0;
var REBORN_RANK = 1;
var MESO_RANK   = 2;
var SEARCH_RANK = 3;
var gRank = 0;
function start()
{
	St = -1;
	action(1, 0, 0);
}

function action(M, T, S)
{
	if(M != 1)
	{
		cm.dispose();
		return;
	}

	if(M == 1)
	St++;
	else
	St--;

	if(St == 0)
	{
		cm.sendSimple("#b\r\n#L"+LEVEL_RANK+"#���� ��ŷ Ȯ�� �ϱ� (�� ���� : "+getMYLevelRank(getIdByName(cm.getPlayer().getName()))+"��)"
			+ "\r\n#L"+REBORN_RANK+"#ȯ�� ��ŷ Ȯ�� �ϱ� (�� ���� : "+getMYRebornsRank(getIdByName(cm.getPlayer().getName()))+"��)"
			+ "\r\n#L"+MESO_RANK+"#�޼� ��ŷ Ȯ�� �ϱ� (�� ���� : "+getMYMesoRank(getIdByName(cm.getPlayer().getName()))+"��)"
			+ "\r\n\r\n#r#L"+SEARCH_RANK+"#���� ��ŷ Ȯ�� �ϱ�");
	}


	else if(St == 1)
	{
		S1 = S;
		Sb = new StringBuilder();
		con = MYSQL.getConnection();
		switch(S1)
		{
			case LEVEL_RANK:
			Con = con.prepareStatement("SELECT * FROM characters where gm = 0 ORDER BY level DESC LIMIT 50").executeQuery();
			while(Con.next())
			{
				getPlayerJobs(Con.getInt("job"));
				getLevelRank();
			}
			if(cm.getPlayer().getGMLevel() != 0)
			{
				cm.sendSimple(Sb.toString());
			}
			else
			{
				cm.sendOk(Sb.toString());
			}
			Con.close();
			con.close();
			break;
			
			case REBORN_RANK:
			Con = con.prepareStatement("SELECT * FROM characters where gm = 0 and reborns > 0 ORDER BY reborns DESC LIMIT 50").executeQuery();
			while(Con.next())
			{
				getPlayerJobs(Con.getInt("job"));
				getRebornsRank();
			}
			if(cm.getPlayer().getGMLevel() != 0)
			{
				cm.sendSimple(Sb.toString());
			}
			else
			{
				cm.sendOk(Sb.toString());
			}
			Con.close();
			con.close();
			break;

			case MESO_RANK:
			Con =  con.prepareStatement("SELECT * FROM characters where gm = 0 ORDER BY meso DESC LIMIT 50").executeQuery();
			while(Con.next())
			{
				getMesoRank();
			}
			if(cm.getPlayer().getGMLevel() > 0)
			{
				cm.sendSimple(Sb.toString());
			}
			else
			{
				cm.sendOk(Sb.toString());
			}
			Con.close();
			con.close();
			break;

			case SEARCH_RANK:
			cm.sendGetText("�˻��� ĳ������ �г����� �Է����ּ���. �Ϻ� ĳ���ʹ� �˻��� ���ѵ� �� �ֽ��ϴ�.");
			break;

			default:
			cm.dispose();
			break;
		}
	}

	else if(St == 2)
	{
		S2 = S;
		if(S1 != 3)
		{
			getCharInfo(S2);
		}
		else
		{
			if(getIdByName(cm.getText()) == null)
			{
				cm.sendOk("�Է��� ĳ���ʹ� �������� �ʽ��ϴ�.");
				cm.dispose();
				return;
			}
			cm.sendOk(""+targetName(getIdByName(cm.getText()))+" ĳ������ ��ŷ �����Դϴ�.#b"
				+ "\r\n������ ��ŷ : #e"+getMYLevelRank(getIdByName(cm.getText()))+"#n�� (Lv."+targetLevel(getIdByName(cm.getText()))+")"
				+ "\r\n��ȯ�� ��ŷ : #e"+getMYRebornsRank(getIdByName(cm.getText()))+"#n�� ("+targetReborns(getIdByName(cm.getText()))+" ��)"
				+ "\r\n���޼� ��ŷ : #e"+getMYMesoRank(getIdByName(cm.getText()))+"#n�� ("+Comma(targetMeso(getIdByName(cm.getText())))+" �޼�)");
			cm.dispose();
		}
	}
}

function getMYLevelRank(i)
{
	var level = 0;
	var con = MYSQL.getConnection();
	var ret = 0;
	var rank = con.prepareStatement("SELECT COUNT(*) FROM characters where gm = 0 and `level` > ?");
	rank.setInt(1, targetLevel(i));
	 eq = rank.executeQuery();
	 if (eq.next())
	{
		ret = eq.getInt("count(*)")+1;
	}
	rank.close();
	eq.close();
	con.close();
	return ret;
}

function getMYRebornsRank(i)
{
	var level = 0;
	var con = MYSQL.getConnection();
	var ret = 0;
	var rank = con.prepareStatement("SELECT COUNT(*) FROM characters where gm = 0 and reborns > 0 and `reborns` > ?");
	rank.setInt(1, targetReborns(i));
	 eq = rank.executeQuery();
	 if (eq.next())
	{
		ret = eq.getInt("count(*)")+1;
	}
	rank.close();
	eq.close();
	con.close();
	return ret;
}

function getMYMesoRank(i)
{
	var level = 0;
	var con = MYSQL.getConnection();
	var ret = 0;
	var rank = con.prepareStatement("SELECT COUNT(*) FROM characters where gm = 0 and `meso` > ?");
	rank.setLong(1, targetMeso(i));
	eq = rank.executeQuery();
	 if (eq.next())
	{
		ret = eq.getInt("count(*)")+1;
	}
	rank.close();
	eq.close();
	con.close();
	return ret;
}


function getLevelRank()
{
	gRank++;
	Sb.append("#fn����ü#")

	if(gRank == 1)
	{
	}
	if(cm.getPlayer().getGMLevel() != 0)
	{
		Sb.append("#L"+Con.getInt("accountid")+"#");
	}
	if(gRank < 10)
	{
		Sb.append("#Cgray#").append("00").append("#b#e").append(""+eval(gRank)+"");
	}
	else if (gRank >= 10 && gRank < 100)
	{
		Sb.append("#Cgray#").append("0").append("#b#e").append(""+eval(gRank)+"");
	}
	else
	{
		Sb.append("#Cgray#").append("#b#e").append(""+eval(gRank)+"");
	}
	Sb.append("��#n#k")
	if(Con.getString("name") == cm.getPlayer().getName())
	{
		Sb.append("��#rLv.").append(eval(Con.getInt("level"))).append("��#e");
		Sb.append(Con.getString("name")).append("#k#n");
	}
	else
	{
		Sb.append("��Lv.").append(eval(Con.getInt("level"))).append("��");
		Sb.append(Con.getString("name"))
	}
	Sb.append(" #Cgray#(").append(job).append(")").append("\r\n");
}

function getRebornsRank()
{
	gRank++;
	Sb.append("#fn����ü#")
	if(gRank == 1)
	{
	}

	if(cm.getPlayer().getGMLevel() != 0)
	{
		Sb.append("#L"+Con.getInt("accountid")+"#");
	}

	if(gRank < 10)
	{
		Sb.append("#Cgray#").append("00").append("#b#e").append(""+eval(gRank)+"");
	}
	else if (gRank >= 10 && gRank < 100)
	{
		Sb.append("#Cgray#").append("0").append("#b#e").append(""+eval(gRank)+"");
	}
	else
	{
		Sb.append("#Cgray#").append("#b#e").append(""+eval(gRank)+"");
	}
	Sb.append("��#n#k")
	if(Con.getString("name") == cm.getPlayer().getName())
	{
		Sb.append("��#r").append(eval(Con.getInt("reborns"))).append("��#e");
		Sb.append(Con.getString("name")).append("#k#n");
	}
	else
	{
		Sb.append("��").append(eval(Con.getInt("reborns"))).append("��");
		Sb.append(Con.getString("name"))
	}
	Sb.append(" #Cgray#(").append(job).append(")").append("\r\n");
}

function getMesoRank()
{
	gRank++;
	Sb.append("#fn����ü#")

	if(gRank == 1)
	{
	}

	if(cm.getPlayer().getGMLevel() != 0)
	{
		Sb.append("#L"+Con.getInt("accountid")+"#");
	}

	if(gRank < 10)
	{
		Sb.append("#Cgray#").append("00").append("#b#e").append(""+eval(gRank)+"");
	}
	else if (gRank >= 10 && gRank < 100)
	{
		Sb.append("#Cgray#").append("0").append("#b#e").append(""+eval(gRank)+"");
	}
	else
	{
		Sb.append("#Cgray#").append("#b#e").append(""+eval(gRank)+"");
	}
	Sb.append("��#n#k")
	if(Con.getString("name") == cm.getPlayer().getName())
	{
		Sb.append("��#r#e").append(Comma(eval(Con.getLong("meso")))).append(" �޼ҡ�");
		Sb.append(Con.getString("name")).append("#k#n\r\n");
	}
	else
	{
		Sb.append("��").append(Comma(eval(Con.getLong("meso")))).append(" �޼ҡ�");
		Sb.append(Con.getString("name")).append("\r\n");
	}
}

function getCharInfo(i)
{
	con = MYSQL.getConnection();
	Con = con.prepareStatement("SELECT * FROM characters WHERE accountid = ?");
	Con.setString(1, i);
	Con = Con.executeQuery();
	Sb  = new StringBuilder();
	Ext = false;
	while (Con.next())
	{
		Ext = true;
		getExp = (Con.getInt("level") == 250) ? 0 : eval(Con.getLong("exp"))/Packages.constants.GameConstants.getExpNeededForLevel(eval(Con.getInt("level"))) * 100;
		Sb.append("#fs12#");
		Sb.append("#e�г���#fs18# #fs12##n: #e#b").append(Con.getString("name")).append("#Cgray##n (�������� : ").append(Con.getString("createdate")).append(")#k\r\n");
		Sb.append(" ��#e����#n : #b").append(eval(Con.getInt("level"))).append("#k (");
		Sb.append(Comma(eval(Con.getLong("exp")))).append(" / "+Comma(Packages.constants.GameConstants.getExpNeededForLevel(eval(Con.getInt("level"))))+"").append(") ");
		Sb.append("["+getExp.toFixed(2)+"%]\r\n");
		Sb.append(" ��#e����#n : #bSTR#k#fs11#(").append((eval(Con.getInt("str")))).append(")  #fs12##bDEX#k#fs11#(").append(eval(Con.getInt("dex")));
		Sb.append(")  #fs12##bINT#k#fs11#(").append(eval(Con.getInt("int"))).append(")  #fs12##bLUK#k#fs11#(").append(eval(Con.getInt("luk"))).append(")#fs12#\r\n");
		Sb.append("#e����  �� #n#rHP#k[#r").append(Comma(eval(Con.getInt("hp")))).append("#k / #r").append(Comma(eval(Con.getInt("maxhp")))).append("#k]  ");
		Sb.append("#bMP#k[#b").append(Comma(eval(Con.getInt("mp")))).append("#k / #b").append(Comma(eval(Con.getInt("maxmp")))).append("#k]\r\n");
		Sb.append(" ��#e�޼�#n : #b").append(Comma(eval(Con.getLong("meso"))));
		Sb.append("#k\r\n\r\n\r\n");
	}
	if (Ext)
	{
		cm.sendOk(Sb.toString());
	}
	else
	{
		cm.sendOk("���� ĳ������ ������ �ԷµǾ����ϴ�. �ٽ� �õ����ּ���.");
	}
	Con.close();
	con.close();
    	cm.dispose();
}

function checkRows(i)
{
	con = MYSQL.getConnection();
	Con = con.prepareStatement("SELECT COUNT(*) FROM characters WHERE name = ?");
	Con.setString(1, i);
	Con = Con.executeQuery();
	Con.next();
	var ret = Con.getInt("count(*)");
	Con.close();
	con.close();
	return ret;
}

function getIdByName(i)
{
	con = MYSQL.getConnection();
	Con = con.prepareStatement("SELECT * FROM characters WHERE name = ?");
	Con.setString(1, i);
	Con = Con.executeQuery();
	Con.next();
	var ret = Con.getInt("id");
	Con.close();
	con.close();
	return ret;
}

function targetName(i)
{
	con = MYSQL.getConnection();
	Con = con.prepareStatement("SELECT * FROM characters WHERE id = ?");
	Con.setString(1, i);
	Con = Con.executeQuery();
	Con.next();
	var ret = Con.getString("name");
	Con.close();
	con.close();
	return ret;
}


function targetLevel(i)
{
	con = MYSQL.getConnection();
	Con = con.prepareStatement("SELECT * FROM characters WHERE id = ?");
	Con.setString(1, i);
	Con = Con.executeQuery();
	Con.next();
	var ret = Con.getString("level");
	Con.close();
	con.close();
	return ret;
}

function targetMeso(i)
{
	con = MYSQL.getConnection();
	Con = con.prepareStatement("SELECT * FROM characters WHERE id = ?");
	Con.setString(1, i);
	Con = Con.executeQuery();
	Con.next();
	var ret = Con.getString("meso");
	Con.close();
	con.close();
	return ret;
}

function targetReborns(i)
{
	con = MYSQL.getConnection();
	Con = con.prepareStatement("SELECT * FROM characters WHERE id = ?");
	Con.setString(1, i);
	Con = Con.executeQuery();
	Con.next();
	var ret = Con.getString("reborns");
	Con.close();
	con.close();
	return ret;
}

function Comma(i)
{
	var reg = /(^[+-]?\d+)(\d{3})/;
	i+= '';
	while (reg.test(i))
	i = i.replace(reg, '$1' + ',' + '$2');
	return i;
}

function getPlayerJobs(i)
{
	switch(i)
	{
		case 100: job = "�˻�"; break;
		case 200: job = "������"; break;
		case 300: job = "�ü�"; break;
		case 400: job = "����"; break;
		case 500: job = "����"; break;
		case 110: job = "������"; break;
		case 111: job = "ũ�缼�̴�"; break;
		case 112: job = "�����"; break;
		case 120: job = "������"; break;
		case 121: job = "����Ʈ"; break;
		case 122: job = "�ȶ��"; break;
		case 130: job = "���Ǿ��"; break;
		case 131: job = "����Ŀ"; break;
		case 132: job = "��ũ����Ʈ"; break;
		case 210: job = "���ڵ�(��, ��)"; break;
		case 211: job = "������(��, ��)"; break;
		case 212: job = "��ũ������(��,��)"; break;
		case 220: job = "���ڵ�(��, ��)"; break;
		case 221: job = "������(��, ��)"; break;
		case 222: job = "��ũ������(��,��)"; break;
		case 230: job = "Ŭ����"; break;
		case 231: job = "������Ʈ"; break;
		case 232: job = "���"; break;
		case 310: job = "����"; break;
		case 311: job = "������"; break;
		case 312: job = "���츶����";  break;
		case 320: job = "���"; break;
		case 321: job = "���ݼ�"; break;
		case 322: job = "�ű�"; break;
		case 410: job = "��ؽ�"; break;
		case 411: job = "���"; break;
		case 412: job = "����Ʈ�ε�";  break;
		case 420: job = "����"; break;
		case 421: job = "����������"; break;
		case 422: job = "������"; break;
		case 430: job = "���̵�"; break;
		case 431: job = "��"; break;
		case 432: job = "��󸶽���"; break;
		case 433: job = "������"; break;
		case 434: job = "�����̴�";  break;
		case 510: job = "��������"; break;
		case 511: job = "��Ŀ�Ͼ�"; break;
		case 512: job = "������"; break;
		case 520: job = "�ǽ�����"; break;
		case 521: job = "��Ű��"; break;
		case 522: job = "ĸƾ"; break;
		case 530: job = "ĳ����"; break;
		case 531: job = "ĳ�������"; break;
		case 532: job = "ĳ������"; break;

		case 1100: case 1110: case 1111: case 1112: job = "�ҿ︶����";  break;
		case 1200: case 1210: case 1211: case 1212: job = "�÷������ڵ�"; break;
		case 1300: case 1310: case 1311: case 1312: job = "����극��Ŀ"; break;
		case 1400: case 1410: case 1411: case 1412: job = "����Ʈ��Ŀ"; break;
		case 1500: case 1510: case 1511: case 1512: job = "��Ʈ����Ŀ"; break;

		case 2100: case 2110: case 2111: case 2112: job = "�ƶ�"; break;
		case 2200: case 2210: case 2211: case 2212: case 2213:
		case 2214: case 2215: case 2216: case 2217: case 2218: job = "����"; break;
		case 2300: case 2310: case 2311: case 2312: job = "�޸�������"; break;
		case 2400: case 2410: case 2411: case 2412: job = "����";  break;
		case 2700: case 2710: case 2711: case 2712: job = "��̳ʽ�"; break;
		case 2500: case 2510: case 2511: case 2512: job = "����"; break;

		case 3100: case 3110: case 3111: case 3112: job = "���󽽷��̾�"; break;
		case 3101: case 3120: case 3121: case 3122: job = "������"; break;
		case 3200: case 3210: case 3211: case 3212: job = "��Ʋ������"; break;
		case 3300: case 3310: case 3311: case 3312: job = "���ϵ�����"; break;
		case 3500: case 3512: case 3511: case 3512: job = "��ī��"; break;
		case 3600: case 3610: case 3611: case 3612: job = "����"; break;
		case 3700: case 3710: case 3711: case 3712: job = "������"; break;
	
		case 5100: case 5110: case 5111: case 5112: job = "������"; break;
		case 6100: case 6110: case 6111: case 6112: job = "ī����"; break;
		case 6500: case 6510: case 6511: case 6512: job = "������������"; break;

		case 14200: case 14210: case 14211: case 14212: job = "Ű�׽ý�"; break;	
		default: "�ʺ���"; break;
	}
}