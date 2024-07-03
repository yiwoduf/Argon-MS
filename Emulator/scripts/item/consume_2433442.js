/*
제작자 : ljw5992@naver.com / Harmony_yeane@nate.com
*/

importPackage(Packages.client.items);

var status = -1;
var arr = "1000024, 1000027, 1000028, 1000041, 1000043, 1000045, 1000046, 1000061, 1000071, 1000081, 1000084, 1000087, 1001034, 1001039, 1001040, 1001041, 1001058, 1001061, 1001069, 1001088, 1001094, 1001105, 1001108, 1002469, 1002470, 1002472, 1002489, 1002490, 1002542, 1002543, 1002544, 1002545, 1002548, 1002549, 1002555, 1002565, 1002567, 1002570, 1002582, 1002583, 1002593, 1002594, 1002596, 1002605, 1002609, 1002653, 1002654, 1002672, 1002673, 1002674, 1002678, 1002679, 1002692, 1002693, 1002694, 1002695, 1002696, 1002697, 1002700, 1002701, 1002703, 1002704, 1002705, 1002706, 1002725, 1002726, 1002727, 1002734, 1002741, 1002742, 1002752, 1002754, 1002759, 1002760, 1002761, 1002775, 1002811, 1002823, 1002831, 1002834, 1002835, 1002836, 1002837, 1002844, 1002847, 1002876, 1002882, 1002886, 1002887, 1002888, 1002889, 1002890, 1002891, 1002937, 1002941, 1002942, 1002956, 1002957, 1002961, 1002967, 1002968, 1002975, 1002983, 1002984, 1002985, 1002987, 1002998, 1002999, 1003000, 1003001, 1003005, 1003014, 1003015, 1003022, 1003044, 1003047, 1003053, 1003054, 1003059, 1003060, 1003074, 1003079, 1003080, 1003082, 1003101, 1003121, 1003130, 1003144, 1003145, 1003146, 1003148, 1003161, 1003182, 1003185, 1003186, 1003187, 1003202, 1003203, 1003208, 1003238, 1003241, 1003247, 1003263, 1003272, 1003295, 1003377, 1003386, 1003387, 1003403, 1003404, 1003417, 1003459, 1003462, 1003463, 1003482, 1003483, 1003484, 1003485, 1003486, 1003487, 1003489, 1003490, 1003504, 1003505, 1003506, 1003508, 1003509, 1003510, 1003516, 1003517, 1003518, 1003531, 1003532, 1003533, 1003536, 1003559, 1003560, 1003594, 1003626, 1003643, 1003654, 1003655, 1003656, 1003657, 1003658, 1003666, 1003667, 1003670, 1003671, 1003672, 1003673, 1003699, 1003713, 1003730, 1003735, 1003742, 1003743, 1003749, 1003759, 1003760, 1003761, 1003775, 1003790, 1003802, 1003804, 1003815, 1003825, 1003826, 1003827, 1003829, 1003830, 1003843, 1003861, 1003889, 1003897, 1003917, 1003918, 1003919, 1003934, 1003936, 1003948, 1003949, 1003950, 1003962, 1003963, 1003964, 1003975, 1004001, 1004015, 1004016, 1004017, 1004018, 1004024, 1004040, 1004041, 1004042, 1004043, 1004044, 1004045, 1004046, 1004047, 1004073, 1004074, 1004090, 1004091, 1004092, 1004093, 1004094, 1004106, 1004108, 1004110, 1004111, 1004113, 1004122, 1004123, 1004125, 1004126, 1004136, 1004137, 1004157, 1004178, 1004190, 1004191, 1004193, 1004199, 1004200, 1004201, 1004202, 1004203, 1004204, 1004205, 1004209, 1004252, 1004253, 1004281, 1004282, 1004284, 1004285, 1004295, 1004296, 1004298, 1004299, 1004301, 1004302, 1004303, 1004304, 1004305, 1004306, 1004307, 1004308, 1004309, 1004310, 1004311, 1004312, 1004313, 1004314, 1004315, 1004316, 1004317, 1004318, 1004319, 1004320, 1004321, 1004322, 1004323, 1004324, 1004325, 1004326, 1004332, 1004386, 1004393, 1004394, 1004395, 1004396, 1004397, 1004398, 1004399, 1004400, 1004401, 1004402, 1004406, 1004413, 1004417, 1004418, 1004419, 1004428, 1004438, 1004439, 1004440, 1004448, 1004455, 1004456, 1004461, 1004462, 1004463, 1004471, 1004478, 1004479, 1004482, 1004483, 1004499, 1004500, 1004501, 1004504, 1004505, 1004506, 1004508, 4009029, 4009029, 4009029, 4009029, 1004515, 1004534, 1004535, 1004536, 1004537, 1004538, 1004539, 1004544, 1004545, 1004546, 1004547, 1004548, 1004559, 1004560, 1004561, 1004562, 1004563, 1004570, 1004571, 1004600, 1004601, 1004612, 1004613, 1004614, 1004635, 1004638, 1004659, 1004660, 1004661, 1004662, 1004671, 1004672, 1004673, 1004706, 1004708, 1004712, 1004713, 1004720, 1004721, 1004722, 1004733, 1004734, 1004757, 1004758, 1004759, 1004760, 1004762, 1004787, 1004788, 1004789, 1004790, 1004799, 1004800, 1004801, 1004802, 1004803, 1004804, 1004805, 1004806, 1004825, 1004826, 1004827, 1004828, 1004829, 1004830, 1004831, 1004832, 1004833, 1004834, 1004835, 1004839, 1004840, 1004841, 1004842, 1004843, 1004844, 1004853, 1004854, 1004858, 1004859, 1004860, 1004862, 1004863, 1004874, 1004876, 1004877, 1004878, 1004879, 1004880, 1004889, 1004890, 1004909, 1004912, 1004916, 1004925, 1004932, 1004933, 1004934, 1004936, 1004937, 1004938, 1004939, 1004940, 1004941, 1004942, 1004945, 1004946, 1004950, 1004951, 1004952, 1004953, 1004961, 1004964, 1004981, 1004982, 1004983, 1004984, 1004996, 1004997, 1004998, 1005003, 1005004, 1005006, 1005007, 1005008, 1005009, 1005010, 1005011, 1005012, 1005013";

function start() {
 action(1, 0, 0);
}

function action(mode, type, selection) {
 if (mode == 1) {
  status++;
 } else {
  status--;
  cm.dispose();
 }
 if (status == 0) {
  cm.sendYesNo("#fn나눔고딕 Extrabold# 뿌잉뿌잉 해외캐쉬가 랜덤으로 뽑힌답니다!! #r꽝#k도있으니 조심하세요^^ 사용하시겠습니까?");

 } else if (status == 1) {
  if (cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot() > 2){
   var itemid = arr.split(",")[Math.floor(Math.random()*54+1)/1];
   cm.sendOk("#i" + itemid + "##b(#z"+itemid+"##k)를 획득했습니다.");
   cm.gainItem(2433442, -1);
   cm.gainItem(itemid,1);
   cm.dispose();
  } else {
   cm.sendOk("#fn나눔고딕 Extrabold# 장비창에 공간이 부족한데? 받기싫구나?");
   cm.dispose();
  }
 }
}