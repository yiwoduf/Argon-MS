function start()
{
	St = -1;
	action(1, 0, 0);
	cm.sendSimple("���, ��� ������ �������� �̵��Ͻðڼ�?\r\n#b"
		+ "#L211042402#���� ����#l\r\n"
		+ "#L211042400#�븻 ����#l\r\n"
		+ "#L211042401#ī���� ����#l\r\n");
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

	if(St == 1)
	{
		S0 = S;
		needItem = (S0 == 211042402) ? 4001796 : 4001017;
		getZakum = (S0 == 211042402) ? "���� " : (S0 == 211042401) ? "ī���� " : "�븻 "; 
		if(!cm.haveItem(needItem))
		{
			cm.getPlayer().dropMessage(5, getZakum + "���񿡰� ��ĥ ������ ���� �̵��� �� �����ϴ�.");
			cm.dispose();
			return;
		}
		cm.dispose();
		cm.warp(S0);
	}
}
