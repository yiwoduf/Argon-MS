importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);
importPackage(Packages.tools);
importPackage(Packages.client.items);
importPackage(Packages.provider);
importPackage(Packages.client);
importPackage(Packages.server.quest);
importPackage(Packages.constants);

function act() {
    rm.getPlayer().setKeyValue("mesodrop", (System.currentTimeMillis()+ (900000 / 5)) +"");
    //rm.getPlayer().dropMessage("5�а� ��ɽ� �޼Ҹ� ȹ���ϽǼ� �ֽ��ϴ�.");
}
