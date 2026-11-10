/* =====================================================================
   펫티시에 상품 상세 설명 글 (기본값)
   ※ 관리자 페이지에서 상품별 '상세 설명 글'을 저장하면 그 내용이 우선 적용돼요.

   쓰는 법
   - 맨 처음 문단 : 상품 소개 (크게 보여요)
   - ## 제목      : 소제목
   - - 이름 | 값  : 표 한 줄 (원재료, 성분 등)
   - > 문장       : 강조 상자
   - 빈 줄        : 문단 나누기
   ===================================================================== */
(function () {
  const TRUST = "> 펫티시에는 아이들의 건강을 위해 사료 성분 등록을 하고 있습니다.\n> 보호자분들과 아이들에게 신뢰와 감사함을 담아 건강과 안전에 힘쓰도록 노력하겠습니다.";
  const SHELF_HEAD = "아이들의 모든 케이크와 간식들은 화학 첨가물, 방부제, 보존제 등이 일체 들어가지 않는 천연 재료만 사용합니다.\n그렇기에 외부 환경이나 날씨의 영향을 많이 받고 소비 기한이 짧습니다.";
  const THAW = "미리 소분하여 냉동 보관해 주시고 급여 전 실온에서 해동 후 급여 부탁드립니다.\n(아이에 따라 차가운 간식을 바로 급여 시 배탈, 구토, 설사 등이 발생할 수 있으니 꼭 찬기가 빠진 후 급여 부탁드립니다.)";

  const tofu = `펫티시에에서 꾸준히 나가는 두부 후르츠링입니다.
매장에 들어오시면 고소한 향이 난다고 하시는데,
그 향은 바로 후르츠링을 굽고 난 후 건조할 때 나는 향입니다.
시즌 또는 계절에 따라 모양이 일부 변경됩니다 :)

## 원재료
- 두부 | 국내산
- 계란 | 국내산
- 박력 쌀가루 | 국내산
- 천연 가루 | 국내산

모든 재료는 국내산, 천연 재료를 사용하고 있습니다.

## 이렇게 만들어요
두부 후르츠링에 쓰이는 두부는
찬물에 한 번, 뜨거운 끓는 물에 한 번, 마지막 찬물에 한 번
총 세 번에 걸쳐 마지막의 마지막까지 남은 염분기를 제거합니다.
손이 많이 가는 정성 가득한 간식입니다.

## 두부의 효능
두부는 콩을 갈아 만든 식품이라 육류 알러지, 고구마 알러지가 있는 아이들이 먹기에 안전합니다.
또한 간 기능의 문제로 동물성 단백질 섭취를 제한할 때 급여하기 좋은 대체 음식입니다.
두부는 식물성 단백질 식품으로 소화, 흡수에 도움이 되어 다양한 질병 예방에 좋습니다.

## 사료의 성분량
- 조지방 | 8.05% 이하
- 조단백질 | 12.2% 이상
- 수분 | 20.62% 이하
- 조섬유 | 0.43% 이하
- 조회분 | 1.03% 이하

${TRUST}

## 급여 방법
두부 후르츠링은 단단한 과자 같은 식감입니다.
크기가 작기 때문에 급하게 삼키지 않도록 지켜봐 주시길 바랍니다.
노즈워크, 훈련, 칭찬용으로 하나씩 주기에 좋은 간식이고
3~5kg인 아이의 하루 기준 정량에 맞게 10g 정도씩 포장해 놓고 있습니다.
아이의 건강 상태와 몸무게에 따라 급여 조절해 주시기 바랍니다.

혹, 댁에서 락토프리 우유를 급여하신다면
시리얼처럼 급여하셔도 됩니다.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 최대 5일
- 냉동 보관 | 3주

냉동 보관 가능하나 찬기가 빠진 후 급여 부탁드립니다.`;

  const coconut = `펫티시에를 찾아와 주시는 보호자분들과 아이들이 가장 좋아하는 간식 중 하나인 고구마 코코넛 볼입니다.
동글동글한 모양에 한입에 먹기 적당한 사이즈로 만든 볼로,
쫀득쫀득하고 코코넛 향이 나는 간식입니다 :)

## 원재료
- 고구마 | 국내산
- 박력 쌀가루 | 국내산
- 천연 가루 | 국내산
- 코코넛 가루 | 필리핀산

국내에서 구하기 힘든 코코넛 가루를 제외한 모든 재료는 국내산, 천연 재료를 사용하고 있습니다.

## 코코넛의 효능
코코넛은 아이들의 피부 건강 개선에 도움이 됩니다.
항염 작용과 항균 작용을 통해 피부병을 완화시키는 효능을 지니고 있습니다.
또한 코코넛에는 식이섬유와 지방산이 함유되어 있어 아이들에게 급여할 시 소화에 도움이 됩니다.
장 건강에 도움을 주기에 면역력을 강화시키는 효능도 지니고 있습니다.

## 사료의 성분량
- 조지방 | 6.26% 이하
- 조단백질 | 2.4% 이상
- 수분 | 55.41% 이하
- 조섬유 | 1.2% 이하
- 조회분 | 1.45% 이하

${TRUST}

## 급여 방법
손쉽게 급여하실 수 있도록 꽂이에 3개씩 꽂아 포장해 놓고 있습니다.
아이가 혹여나 먹다 다칠 수 있어, 보호자분께서는 급여 시 직접 손으로 빼서 급여해 주세요.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 2일
- 냉동 보관 | 3주

미리 소분하여 냉동 보관해 주시고 급여 전 전자레인지에 10초 내외로 잠깐씩 돌려 찬기가 빠진 후 급여를 권해 드립니다.
(아이에 따라 차가운 간식을 바로 급여 시 배탈, 구토, 설사 등이 발생할 수 있으니 꼭 찬기가 빠진 후 급여 부탁드립니다.)`;

  const cookie = `아이들이 가장 선호하고 기호성이 좋은 고구마 쿠키입니다.
고구마 알러지가 있는 친구들을 제외하고는
매장에 방문하시면 꼭 하나씩 구매하시는 제품입니다.
시즌 또는 계절에 따라 모양이 일부 변경됩니다 :)

## 원재료
- 고구마 | 국내산
- 엑스트라 버진 오일 | 이탈리아산
- 박력 쌀가루 | 국내산
- 계란 | 국내산
- 천연 가루 | 국내산

펫티시에는 일반 오일이 아닌 이탈리아산 엑스트라 버진 오일을 사용하고 있습니다.

## 이렇게 만들어요
가장 상태 좋은 고구마로만 선별하여
직접 삶고 으깬 후 엑스트라 버진 오일을 넣어
풍미를 더욱 느낄 수 있는 고구마 쿠키입니다.

## 고구마의 효능
고구마에는 비타민 A, 철, 섬유질 등 다양한 영양소가 있어
아이들의 털, 피부, 근육과 시력에도 도움을 줍니다.
식이섬유소가 풍부해 아이들의 배변 활동을 원활하게 도와 변비나 장이 약한 아이들에게 도움이 됩니다.
또한 아이들이 느끼기에 가장 단맛을 내는 음식으로 기호성이 가장 좋습니다.

## 사료의 성분량
- 조지방 | 6.6% 이하
- 조단백질 | 5.16% 이상
- 수분 | 11.75% 이하
- 조섬유 | 0.86% 이하
- 조회분 | 1.14% 이하

${TRUST}

## 급여 방법
고구마 쿠키는 사람이 먹는 쿠키보다 좀 더 식감이 강한 과자 같은 식감입니다.
크기가 있는 쿠키는 직접 손으로 부숴서 급여해 주시면 좋습니다.
노즈워크, 훈련용, 칭찬용으로 주기에 좋은 간식이며
3~5kg 아이의 하루 기준 정량에 맞게 개별 포장해 놓고 있습니다.
아이의 건강 상태와 몸무게에 따라 급여 조절해 주시기 바랍니다.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 4일
- 냉동 보관 | 3주

${THAW}`;

  const capelin = `강아지 친구들에게도, 고양이 친구들에게도
기호성이 좋은 영양 가득 열빙어입니다.

12시간 이상 물을 계속해서 갈아 주며
염분을 모두 제거한, 손길이 많이 가는 건조 간식입니다.
저온으로 오랜 시간 건조해서 딱딱하지 않은 건조 열빙어입니다.

## 원재료
- 열빙어 | 아이슬란드산

펫티시에는 아이슬란드산 암열빙어만 사용하고 있습니다.
날이 선선한 초가을부터 초봄까지만 나오는 계절 제품입니다.
암열빙어만을 사용해 알이 가득 차 있습니다.

## 열빙어의 효능
열빙어에는 비타민 A, E가 풍부하게 함유되어
강아지와 고양이 모두 면역력을 강화하기에 좋습니다.
또한 칼슘과 철분의 함량이 높아 관절 건강에도 좋고,
뼈와 치아 형성에 아주 좋습니다.

특히 펫티시에에서 사용하고 있는 열빙어는
사람이 먹는 최상 등급의 열빙어입니다.
내장이 가득한 열빙어가 아닌 알로만 꽉꽉 차 있어서 더욱 담백하고 영양분이 높습니다.

## 사료의 성분량
- 조지방 | 32.36% 이하
- 조단백질 | 27.52% 이상
- 수분 | 40.46% 이하
- 조섬유 | 0.57% 이하
- 조회분 | 3.5% 이하

${TRUST}

## 급여 방법
영양분이 많아 5kg 이하인 아이들은 하루에 한 마리를 권해 드립니다만,
아이의 상태에 따라 더 적게 혹은 더 많이 급여 가능합니다.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 3일
- 냉동 보관 | 3주

${THAW}`;

  const salmon = `강아지 친구들에게도, 고양이 친구들에게도
기호성이 좋은 단백질 가득한 영양 간식, 연어 큐브입니다.

12시간 이상 물을 계속해서 갈아 주며
염분을 모두 제거한, 손길이 많이 가는 건조 간식입니다.
저온으로 오랜 시간 건조해서 딱딱하지 않은 건조 코호 연어 큐브입니다.

## 원재료
- 코호 연어 | 칠레산

펫티시에에서 사용하고 있는 연어는 자연산 참연어가 아닌 칠레산 코호 연어입니다.
일반 연어와 달리 단백질 함량이 굉장히 높은, 사람이 같이 먹을 수 있는 고급 연어입니다.
지방이 적은 코호 연어지만 그마저도 손질하여 건강에 좋은 건조 간식입니다.

## 연어의 효능
연어에는 오메가3 지방산과 EPA, DHA가 포함되어 아이들의 피부와 털을 윤기 나게 해 줍니다.
단백질이 풍부해 관절 건강에 좋고
비타민이 풍부해 면역력 강화에도 좋습니다.

## 사료의 성분량
- 조지방 | 3.12% 이하
- 조단백질 | 65.24% 이상
- 수분 | 16.87% 이하
- 조섬유 | 0.74% 이하
- 조회분 | 1.29% 이하

${TRUST}

## 급여 방법
보상 간식으로도 좋고 사료와 같이 토핑으로 급여하셔도 괜찮습니다.
영양분이 많아 5kg 이하인 아이들은 하루에 10알 이하를 권해 드립니다만,
아이의 상태에 따라 더 적게 혹은 더 많이 급여 가능합니다.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 3일
- 냉동 보관 | 3주

${THAW}`;

  const CHICKEN_NOTE = `펫티시에에서 사용하고 있는 닭 안심은
분쇄육이 아닌 원료육 자체를 직접 깨끗하게 손질 후 다져서 사용합니다.
까다로운 품질 관리와 깨끗한 정육으로 안심할 수 있고
HACCP 인증을 받은 무항생제 닭만을 사용하고 있습니다.`;

  const chips = `바삭바삭한 칩의 식감으로
야채를 잘 먹지 않는 아이들에게 인기 만점인 야채 꼬꼬칩입니다.
닭 안심을 꼼꼼하게 세척 후 손질하고, 모든 야채는 직접 손으로 다져서 만든 수제 간식입니다.
저온으로 오랜 시간 건조하여 많이 딱딱하지 않고 바삭바삭합니다.

## 원재료
- 닭 안심 | 국내산
- 당근 | 국내산
- 브로콜리 | 국내산
- 애호박 | 국내산
- 파프리카 | 국내산

모든 재료는 국내산, 천연 재료를 사용하고 있습니다.

${CHICKEN_NOTE}

## 닭 안심의 효능
닭 안심은 지방 함량이 낮고 단백질이 많이 함유되어 있어 비만 예방에 좋습니다.
또한 열량이 낮아 소화 흡수에 도움을 줍니다.

안에 들어가는 야채는
파프리카 2종류, 당근, 브로콜리, 애호박을 직접 데치고 다져
영양소를 최대한 파괴하지 않았습니다.

## 사료의 성분량
- 조지방 | 2.92% 이하
- 조단백질 | 62.5% 이상
- 수분 | 14.16% 이하
- 조섬유 | 0.9% 이하
- 조회분 | 8.14% 이하

${TRUST}

## 급여 방법
고구마 쿠키보다는 살짝 칩 같은 식감입니다.
훈련용, 칭찬용, 보상용으로 주기에 좋은 간식이며
5kg 이하인 아이 평균 2일 기준에 맞추어 개별 포장해 놓고 있습니다만,
아이의 건강 상태와 몸무게, 활동량, 소화 능력에 따라 급여 조절해 주시기 바랍니다.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 5일
- 냉동 보관 | 3주

${THAW}`;

  const jerky = `바삭 쫀득한 져키로
이갈이 하는 친구들에게 인기 만점인, 닭 안심살로 만든 져키입니다.
닭 안심을 꼼꼼하게 세척 후 손질하고
직접 하나하나 눈으로 보며 확인하는 수제 간식입니다.
저온으로 오랜 시간 건조하여 많이 딱딱하지 않고 쫀득한 식감입니다.

## 원재료
- 닭 안심 | 국내산

모든 재료는 국내산, 천연 재료를 사용하고 있습니다.

${CHICKEN_NOTE}

## 닭 안심의 효능
닭 안심은 지방 함량이 낮고 단백질이 많이 함유되어 있어 비만 예방에 좋습니다.
또한 열량이 낮아 소화 흡수에 도움을 줍니다.

## 사료의 성분량
- 조지방 | 2.41% 이하
- 조단백질 | 52.68% 이상
- 수분 | 32.19% 이하
- 조섬유 | 0.31% 이하
- 조회분 | 5.95% 이하

${TRUST}

## 급여 방법
육포 같은 느낌의 져키입니다.
아이의 건강 상태와 몸무게, 활동량, 소화 능력에 따라 급여 조절해 주시기 바랍니다.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 3일
- 냉동 보관 | 3주

${THAW}`;

  const duck = `조금은 궁금증이 생기실 수 있고
생긴 모습에 놀라실 수도 있는 오리 울대입니다.
오리 울대는 12시간 이상 물을 계속 갈아 주며
울대 겉과 속까지 하나하나 깨끗하게 씻고
지방과 막을 제거한, 손길이 정말 많이 가는 건조 간식입니다.
저온으로 오랜 시간 건조하여 딱딱하지 않고 바삭바삭합니다.

## 원재료
- 오리 울대 | 국내산

모든 재료는 국내산, 천연 재료를 사용하고 있습니다.

## 오리 울대의 효능
오리 울대는 닭고기 알러지가 있는 친구들에게 대신 단백질을 채워 줄 수 있는 좋은 식품입니다.
또한 콜라겐이 풍부해 피부 및 피모 관리에 좋으며,
오리 울대 원료육 하나만 사용한 저칼로리 간식으로 비만견에게도 좋습니다.
딱딱하지 않은 식감이라 퍼피부터 노령견까지 모두 급여하시기에 정말 좋은 간식입니다.
국내산 오리 울대만을 사용하고 직접 눈으로 확인하며 하나하나 건조시켰습니다.

## 사료의 성분량
- 조지방 | 2.71% 이하
- 조단백질 | 51.36% 이상
- 수분 | 5.98% 이하
- 조섬유 | 0.3% 이하
- 조회분 | 28.5% 이하

${TRUST}

## 급여 방법
처음에는 보호자님과 아이들 모두 생소할 수 있는 울대지만
한번 먹으면 아이들이 두 손으로 잡고 먹는 귀여운 모습도 보실 수 있는 간식입니다.
울대 길이가 길어 아이가 불편해한다면 손으로 쪼개서 급여해 주시면 됩니다.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 5일
- 냉동 보관 | 3주

${THAW}`;

  const breast = `말랑 촉촉한 져키로
이가 약한 친구 또는 촉촉한 느낌을 선호하는 아이들에게 인기 만점인,
오로지 닭가슴살 하나로 만든 져키입니다.
닭가슴살을 아주 꼼꼼하게 세척 후 손질하고
직접 하나하나 눈으로 보며 확인하는 수제 간식입니다.
저온으로 오랜 시간 건조하여 촉촉하고 말랑한 식감입니다.

## 원재료
- 닭가슴살 | 국내산

모든 재료는 국내산, 천연 재료를 사용하고 있습니다.

펫티시에에서 사용하고 있는 닭가슴살은
분쇄육이 아닌 원료육 자체를 직접 깨끗하게 손질하여 사용합니다.
까다로운 품질 관리와 깨끗한 정육으로 안심할 수 있고
HACCP 인증을 받은 닭만을 사용하고 있습니다.

## 닭가슴살의 효능
닭가슴살은 단백질이 풍부해 아이들 관절과 피모 관리에 좋습니다.
또한 열량이 낮고 지방 함량이 낮아 비만 예방에 좋습니다.

## 사료의 성분량
- 조지방 | 1.67% 이하
- 조단백질 | 37.73% 이상
- 수분 | 57.88% 이하
- 조섬유 | 0.07% 이하
- 조회분 | 3.73% 이하

${TRUST}

## 급여 방법
진공팩으로 1차 포장을 하고 있습니다.
칼집을 내 두어 칼집 선대로 가위 또는 손으로 찢어서 미리 소분 가능합니다.
촉촉하여 통으로 급여해 주셔도 되고
가위로 잘라 사료 위 토핑으로 급여해 주셔도 좋습니다.
아이의 건강 상태와 몸무게, 활동량, 소화 능력에 따라 급여 조절해 주시기 바랍니다.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 3일
- 냉동 보관 | 3주

${THAW}`;

  const skin = `연어가 강아지에게 좋은 간식인 건 알고 계셨겠지만
연어 껍질은 생소하실 수 있습니다.
연어 껍질은 단백질이 풍부해 아이들 피모, 뼈에도 굉장히 좋습니다.

껍질에 있는 비늘을 하나하나 깨끗하게 제거한 후 씻고 소독합니다.
한 줄 한 줄 직접 꼬는 공정을 거치는, 손이 많이 가는 간식입니다.
돌돌 말고 꼬는 과정을 거쳐 아이들이 오래 먹을 수 있습니다.
육류 알러지가 있는 친구, 스트레스 해소가 필요한 친구들에게도 좋으며
비늘도 없고 열풍 건조로 부스러기도 나오지 않는다는 장점이 있습니다.

## 원재료
- 연어 껍질 | 칠레산, 노르웨이산

펫티시에에서 사용하고 있는 연어 껍질은 최상급의 칠레산, 노르웨이산입니다.

## 사료의 성분량
- 조지방 | 33.89% 이하
- 조단백질 | 44.16% 이상
- 수분 | 9.35% 이하
- 조섬유 | 0.06% 이하
- 조회분 | 1.2% 이하

${TRUST}

## 급여 방법
연어 껍질을 얇고 길게 꼬아 식감이 강합니다.
뼈 간식 대체로 가능하니 아이의 이 상태를 확인 후 급여 부탁드립니다.
5kg 이하인 아이 하루 기준에 맞추어 3줄씩 개별 포장해 놓고 있습니다만,
아이의 건강 상태와 몸무게, 활동량, 소화 능력에 따라 급여 조절해 주시기 바랍니다.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 5일
- 냉동 보관 | 3주

${THAW}`;

  /* ── 2026-11 추가 : 테린 · 우피 말이 · 오리 야채 스틱 · 터키츄 · 수비드 · 야채 퓨레 ── */
  const DUCK_NOTE = `오리 안심은 분쇄육을 사용하지 않고
직접 안심을 하나하나 손질하고 세척하고 있습니다.
막을 한 줄 한 줄 제거한 후 소독해 직접 갈아 사용하고 있습니다.
야채 또한 직접 다져 영양소를 최대한 적게 파괴했습니다.`;

  const lotus = `국내산 연근을 얇게 썰어 손질한 오리 안심을 채운 뒤
저온으로 오랜 시간 건조한 오리 연근칩입니다.
연근의 아삭함과 오리의 고소함을 한 번에 느낄 수 있는 간식입니다 :)

## 원재료
- 오리 안심 | 국내산
- 연근 | 국내산

펫티시에의 오리 연근칩은 모두 국내산 재료를 사용하고 있습니다.

## 이렇게 만들어요
${DUCK_NOTE}

연근은 하나하나 껍질을 벗기고 일정한 두께로 썰어 깨끗하게 세척했습니다.
연근 구멍 사이사이까지 오리 안심을 꼼꼼하게 채워
저온으로 오랜 시간 건조해 바삭하면서도 딱딱하지 않습니다.

## 연근의 효능
연근은 식이섬유와 비타민 C가 풍부해 장 건강과 면역력 관리에 도움을 줍니다.
오리 안심은 닭고기 알러지가 있는 친구들에게 대신 단백질을 채워 줄 수 있는 좋은 식품입니다.

## 급여 방법
손으로 쉽게 쪼개지는 식감이라
아이 크기에 맞게 잘라 급여해 주시면 좋습니다.
3kg 기준 아이가 하루에 1~2개 급여하시면 좋습니다.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 3일
- 냉동 보관 | 3주

${THAW}`;

  const terrine = `촉촉하고 맛있는 테린으로
야채를 잘 먹지 않는 아이들에게 기호성이 좋은 강아지 테린입니다.
닭 가슴살을 꼼꼼하게 세척 후 손질하고
모든 야채는 직접 손으로 다져서 만든 수제 간식입니다.
오븐에 구워 딱딱하지 않고, 안은 굉장히 촉촉한 야채 테린입니다.

## 원재료
- 닭 가슴살 | 국내산
- 당근 | 국내산
- 브로콜리 | 국내산
- 애호박 | 국내산
- 파프리카 | 국내산

모든 재료는 국내산, 천연 재료를 사용하고 있습니다.

펫티시에에서 사용하고 있는 닭 가슴살은
분쇄육이 아닌 원료육 자체를 직접 깨끗하게 손질 후 다져서 사용합니다.
까다로운 품질 관리와 깨끗한 정육으로 안심할 수 있고
HACCP 인증을 받은 닭만을 사용하고 있습니다.

## 닭 가슴살의 효능
닭 가슴살에는 필수 아미노산과 글루코사민이 함유되어 있어 뼈와 관절 건강에 좋습니다.
또한 오메가-6 지방산은 피부와 모질 개선에 도움이 됩니다.
단백질이 풍부하게 함유되어 있어 아이들의 근육 강화에 도움을 주어 특히 성장기 아이들에게 좋습니다.
나이아신이 풍부해 신진대사를 원활하게 도와주는 역할을 합니다.

## 사료의 성분량
- 조지방 | 1.02% 이하
- 조단백질 | 18.57% 이상
- 수분 | 67% 이하
- 조섬유 | 0.57% 이하
- 조회분 | 1.46% 이하

${TRUST}

## 급여 방법
냉장 보관이 쉽도록 진공 포장해 놓고 있습니다.
아이의 하루 사료 급여량의 10% 정도만 권해 드리고 있으나,
아이의 건강 상태와 몸무게, 활동량, 소화 능력에 따라 급여 조절해 주시기 바랍니다.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 최대 3일
- 냉동 보관 | 3주

냉동 보관 가능하나 찬기가 빠진 후 급여 부탁드립니다.`;

  const roll = `아이들이 펫티시에 간식을 너무 맛있어해서
금방금방 먹어 고민이라고 하시는 분들이 꽤 계셨습니다.
오래 먹을 수 있는 간식을 원하셔서
정말 오랜 시간 테스트해서 오픈했습니다.
다만, 그나마 오래 먹을 수 있는 간식이지
저온으로 오래 건조해 아주 오래 먹을 수 있는 간식은 아닙니다.

## 원재료
- 우피 | 국내산
- 오리 안심 | 국내산
- 당근 | 국내산
- 애호박 | 국내산
- 브로콜리 | 국내산
- 파프리카 | 국내산

펫티시에의 우피 오리 야채 말이는 모두 국내산 재료를 사용하고 있습니다.

## 사료의 성분량
- 조지방 | 1.04% 이하
- 조단백질 | 52.90% 이상
- 수분 | 42.74% 이하
- 조섬유 | 0.08% 이하
- 조회분 | 0.85% 이하

${TRUST}

## 이렇게 만들어요
${DUCK_NOTE}
한데 모아 섞어 내용물이 풍부한 우피 말이입니다.

## 급여 방법
막대 하나를 그냥 주면 아이들이 안에 있는 오리 고기를 찾으면서
노즈워크 하듯 스트레스를 풀며 먹기 좋은 간식입니다.
치석 제거에 도움을 줄 수 있습니다.
5kg 기준 아이가 하루에 1줄 급여하시면 좋습니다.
다른 우피 말이에 비해 많이 딱딱하지 않고 조금 촉촉한 편이지만,
아이에 따라 급하게 삼켜 먹는 경우가 있으니 보호자님께서 확인해 주시는 게 가장 좋습니다.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 4일
- 냉동 보관 | 3주

${THAW}`;

  const duckStick = `펫티시에 간식을 너무 맛있어하는 아이들이 늘어나며
노견 친구들, 이가 약한 친구들이 꽤 계셔서 한참을 고민했던 간식입니다.
저온으로 오랜 시간 건조해 딱딱하지 않은 오리 야채 스틱입니다 :)

## 원재료
- 오리 안심 | 국내산
- 당근 | 국내산
- 애호박 | 국내산
- 브로콜리 | 국내산
- 파프리카 | 국내산

펫티시에의 오리 야채 스틱은 모두 국내산 재료를 사용하고 있습니다.

## 사료의 성분량
- 조지방 | 3% 이하
- 조단백질 | 89.72% 이상
- 수분 | 25.62% 이하
- 조섬유 | 0.39% 이하
- 조회분 | 4.73% 이하

${TRUST}

## 이렇게 만들어요
${DUCK_NOTE}

정말 부드럽고 촉촉한 내용물을 일정한 길이, 같은 양으로 짜 준 후
저온으로 오랜 시간 건조시켜 오리 향이 더 짙은 건조 간식입니다.
손으로도 찢어질 수 있는 육포 재질이며,
가위로 잘게 잘라 사료와 섞어 주면 좋습니다.

## 급여 방법
매우 촉촉하고 쫀득한 느낌이며
손으로 자르기도 쉬워 노즈워크 또는 사료에 섞어 급여 가능합니다.
3kg 기준 아이가 하루에 1~2줄 급여하시면 좋습니다.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 3일
- 냉동 보관 | 3주

${THAW}`;

  const turkey = `닭 알러지가 있는 친구들과 기존 보호자님들의 재요청이 많아
칠면조 힘줄로만 만든 터키츄로 돌아왔습니다.

오래 씹을 수 있는 간식 중 하나여서 인기가 많습니다.
힘줄 한 줄 한 줄 깨끗하게 소독한 후 직접 꼬아 가며 만드는
손길이 많이 가는 건조 간식입니다.
터키츄 두께는 2종류로 나누어 제작했습니다.

## 원재료
- 칠면조 힘줄 | 미국산

펫티시에에서 사용하고 있는 칠면조 힘줄은 미국산입니다.

## 사료의 성분량
- 조지방 | 4.38% 이하
- 조단백질 | 69.67% 이상
- 수분 | 10.00% 이하
- 조섬유 | 0.10% 이하
- 조회분 | 0.87% 이하

${TRUST}

## 칠면조의 효능
칠면조는 고단백 식품으로 다이어트에도 굉장히 도움이 됩니다.
불포화지방산과 칼륨이 풍부해 특히 성장기 아이에게 좋습니다.
지방이 적고 단백질이 풍부해 체중 관리하는 아이에게 좋으며
힘줄 부위를 사용하기에 오래 씹어 먹을 수 있습니다.

## 두께 고르기
- 1줄 꼬기 | 굉장히 얇아 소형견 친구들이 먹기에 좋아요 · 한 팩 10줄
- 2줄 꼬기 | 모든 친구들이 먹기에 좋아요 · 한 팩 6줄

## 급여 방법
칠면조 힘줄로만 만들어 기호성이 굉장히 좋습니다.
이갈이 또는 치석 제거에 좋으며 오래 씹어 먹을 수 있는 간식입니다.
마지막 잔조각이 남았을 때 혹시 다치지 않도록 보호자님께서 끝까지 확인해 주세요.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 4일
- 냉동 보관 | 3주

${THAW}`;

  const SOUSVIDE = `## 수비드라서 좋아요
수비드의 장점은 정말 많은데요,
그중 첫 번째는 영양 손실이 적다는 점입니다.
저온에서 조리하기에 비타민, 육즙 등의 손실이 적습니다.
그다음은 식감을 빼놓을 수 없을 것 같습니다.
단백질이 천천히 익기 때문에 매우 촉촉합니다.
노령견, 치아가 약한 강아지들에게는 더욱 좋은 간식입니다.`;
  const SOUSVIDE_FEED = `## 급여 방법
매우 촉촉해서 그냥 급여하셔도 괜찮고, 찢어서 토핑으로도 급여 가능합니다.
진공팩으로 2차 포장을 해 더욱 안전하고 깔끔합니다.
매우 촉촉한 게 특징이기에 해동 시 실온 해동해 주시는 게 가장 좋습니다 :)

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 2일
- 냉동 보관 | 3주

${THAW}`;

  const horse = `펫티시에에서 처음으로 선보인 수비드 라인입니다.
까다로운 손질과 온도, 시간을 지켜 만든 수비드 말고기입니다 :)
수비드 말고기는 원료육 그대로를 깨끗하게 손질하고 세척 후 사용하고 있습니다.

## 원재료
- 말고기 | 제주산

펫티시에에서 사용하고 있는 말고기는 국내 제주산만을 사용하고 있습니다.

## 사료의 성분량
- 조지방 | 0.29% 이하
- 조단백질 | 26.07% 이상
- 수분 | 77.35% 이하
- 조섬유 | 0.08% 이하
- 조회분 | 1.18% 이하

${TRUST}

${SOUSVIDE}

말고기는 지방이 매우 적고 단백질 함량이 높아
다이어트하는 강아지 또는 알러지 대체 단백질로 좋습니다 :)

${SOUSVIDE_FEED}`;

  const sousChicken = `펫티시에에서 처음으로 선보인 수비드 라인입니다.
까다로운 손질과 온도, 시간을 지켜 만든 수비드 닭가슴살입니다 :)
수비드 닭가슴살은 원료육 그대로를 깨끗하게 손질하고 세척 후 사용하고 있습니다.

## 원재료
- 닭가슴살 | 국내산

펫티시에에서 사용하고 있는 닭가슴살은 국내산만을 사용하고 있습니다.

## 사료의 성분량
- 조지방 | 0.77% 이하
- 조단백질 | 21.4% 이상
- 수분 | 84.72% 이하
- 조섬유 | 0.11% 이하
- 조회분 | 2.17% 이하

${TRUST}

${SOUSVIDE}

닭가슴살은 지방이 매우 적고 단백질 함량이 높아
다이어트하는 강아지 또는 알러지 대체 단백질로 좋습니다 :)

${SOUSVIDE_FEED}`;

  const PUREE_HEAD = `레시피 고민으로만 한 달이 걸린 야채 퓨레입니다.
아이들 밥 위에 토핑으로 올려 주셔도 되고, 얼리면 아이스크림처럼 급여가 가능합니다.`;
  const PUREE_MAKE = `맹물은 단 한 방울도 들어가지 않고 채즙으로만 수분을 채웠습니다.
핸드 블렌더로 2차 가공을 해 목 넘김에 불편함이 없도록 제조했습니다.`;
  const PUREE_TAIL = `## 급여 방법
아이들 사료 위에 토핑으로 올려 주시기에 좋습니다.
날이 더운 여름에는 얼려서 아이스크림처럼 급여하셔도 되고,
날이 춥고 아이 배가 안 좋은 날에는 중탕한 물에 살짝씩 데워 따뜻하게 급여하셔도 됩니다.

## 소비 기한
${SHELF_HEAD}
- 냉장 보관 | 4일
- 냉동 보관 | 3주

${THAW}`;

  const pureeYellow = `${PUREE_HEAD}
호박도 모두 소독 후 씨를 제거합니다.
껍질도 제거하여 가장 맛있고 부드러운 부분만을 사용하고 있습니다.
재료에 들어가는 모든 채소들은 1차 소독을 한 후 삶고 데쳐
영양소를 최대한 적게 파괴했습니다.

## 원재료
- 단호박 | 국내산
- 당근 | 국내산
- 양배추 | 국내산

펫티시에의 옐로우 퓨레는 모두 국내산 재료를 사용하고 있습니다.

## 사료의 성분량
- 조지방 | 0.66% 이하
- 조단백질 | 1.52% 이상
- 수분 | 106.82% 이하
- 조섬유 | 0.67% 이하
- 조회분 | 0.71% 이하

${TRUST}

## 이렇게 만들어요
당근, 호박, 양배추를 삶고 데쳐 핸드 블렌더로 직접 갈아 소분했습니다.
${PUREE_MAKE}

${PUREE_TAIL}`;

  const pureeGreen = `${PUREE_HEAD}
시금치는 남해 시금치를 사용하여 매우 달고 맛있습니다.
재료에 들어가는 모든 채소들은 1차 소독을 한 후 삶고 데쳐
영양소를 최대한 적게 파괴했습니다.

## 원재료
- 시금치 | 국내산
- 애호박 | 국내산
- 브로콜리 | 국내산
- 양배추 | 국내산

펫티시에의 그린 퓨레는 모두 국내산 재료를 사용하고 있습니다.

## 사료의 성분량
- 조지방 | 0.12% 이하
- 조단백질 | 2.15% 이상
- 수분 | 112.52% 이하
- 조섬유 | 0.49% 이하
- 조회분 | 1.04% 이하

${TRUST}

## 이렇게 만들어요
시금치, 애호박, 브로콜리, 양배추를 삶고 데쳐 핸드 블렌더로 직접 갈아 소분했습니다.
${PUREE_MAKE}

${PUREE_TAIL}`;

  const pureePurple = `${PUREE_HEAD}
블루베리는 생블루베리를 사용하고 있습니다.
재료에 들어가는 모든 채소들은 1차 소독을 한 후 삶고 데쳐
영양소를 최대한 적게 파괴했습니다.

## 원재료
- 블루베리 | 칠레산
- 양배추 | 국내산
- 적배추 | 국내산

펫티시에의 퍼플 퓨레는 블루베리(칠레산)를 제외한 모든 재료를 국내산으로 사용하고 있습니다.

## 사료의 성분량
- 조지방 | 0.3% 이하
- 조단백질 | 0.89% 이상
- 수분 | 105.45% 이하
- 조섬유 | 1.08% 이하
- 조회분 | 0.44% 이하

${TRUST}

## 이렇게 만들어요
블루베리, 양배추, 적배추를 삶고 데쳐 핸드 블렌더로 직접 갈아 소분했습니다.
${PUREE_MAKE}

${PUREE_TAIL}`;

  /* ── 말랑 우유껌 (스마트스토어 상세 이미지 글을 옮김) ── */
  const milk = `아이들의 이갈이 용으로 가장 좋은 우유껌입니다.
우유껌은 락토프리 저지방 우유와 한천가루, 천연가루로 모양과 맛을 내고 있습니다.

딱딱하지 않은 저온으로 오랜 시간 건조해
말랑 쫀득한 우유껌으로 기호성이 높습니다.

## 우유의 효능
우유는 특히 성장기 아이들에게 좋습니다.
비타민 D와 칼슘이 풍부해 치아와 뼈를 튼튼하게 해주고
수분 섭취와 단백질 공급, 식욕부진, 피모, 면역력 강화에 도움을 줍니다.
음수량이 적고 수분 결핍 타입인 아이들에게
우유와 함께 포함된 한천가루의 보습성으로 더욱이 좋습니다.

## 천연 가루
비트 가루, 브로콜리 가루, 단호박 가루, 캐롭 가루 등
다양한 천연가루를 사용하기에
아이들이 먹기에도 보호자님이 구매하시기에도 질리지 않는 간식입니다.

## 사료의 성분량
- 조지방 | 1.66% 이하
- 조단백질 | 11.12% 이상
- 수분 | 56.07% 이하
- 조섬유 | 0.55% 이하
- 조회분 | 4.17% 이하

${TRUST}`;

  window.PRODUCT_STORIES = {
    // 말랑 우유껌
    "11250116756": milk,
    // 두부 후르츠링
    "10833175823": tofu, "12279890723": tofu, "11888082495": tofu,
    // 고구마 코코넛 볼
    "10829745766": coconut, "12404550727": coconut,
    // 고구마 쿠키
    "10833522315": cookie,
    // 건조 열빙어
    "11224529580": capelin, "12404521217": capelin,
    // 코호 연어 큐브
    "11227631311": salmon, "12404537428": salmon,
    // 야채 꼬꼬칩
    "11243749707": chips, "12404542115": chips,
    // 꼬꼬 안심 져키
    "11288330864": jerky, "12404512523": jerky,
    // 오리 울대
    "11319239090": duck,
    // 통 닭가슴살 져키
    "12026221104": breast,
    // 연어 껍질
    "12026261803": skin,
    // 강아지 테린
    "11244043465": terrine,
    // 우피 오리 야채 말이
    "12400730936": roll,
    // 오리 연근칩
    "pt-lotuschip": lotus,
    // 저온건조 오리 야채 스틱
    "12586050184": duckStick,
    // 칠면조 힘줄 터키츄
    "13441996522": turkey,
    // 수비드 말고기
    "13441867854": horse,
    // 수비드 닭가슴살
    "13441734953": sousChicken,
    // 야채 퓨레 옐로우 (기본 · 벌크)
    "12026300387": pureeYellow, "12404494073": pureeYellow,
    // 야채 퓨레 그린 (기본 · 벌크)
    "12026326721": pureeGreen, "12404488806": pureeGreen,
    // 야채 퓨레 퍼플
    "12586086850": pureePurple
  };

  /* 글 → HTML 변환 (상세페이지·관리자 미리보기 공용) */
  /* 모든 상품 상세 맨 위에 나오는 펫티시에 소개 (예전 스마트스토어 캡쳐 이미지 글을 옮김) */
  window.PRODUCT_INTRO = `안녕하세요 펫티시에입니다.

펫티시에는 공장이 아닌 시청에서 허가 받은 수제간식점에서 직접 하나하나 제조하고 있습니다.
모든 제품은 주문 확인 후 제작이 들어가 최소 3일 정도의 시간이 소요됩니다.
그만큼 꼼꼼하게 재료를 두 눈으로 확인하고 직접 맛보고 판매합니다.

매장은 평촌 관양동쪽에 위치하고 있으며
아이들과 뒤에 안양천에서 산책하시다 들리시기에 좋고, 현장에서는 매장가로 구매 가능합니다 :)`;

  /* 글 렌더링
     media : [{src, type:"img"|"video"}] → 글 앞, 소개 문단 뒤, 각 소제목 단락 뒤에 고르게 나눠 넣어요. */
  window.renderStory = function (text, media, name) {
    media = media || [];
    if ((!text || !String(text).trim()) && !media.length) return "";
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const lines = String(text || "").replace(/\r/g, "").split("\n");
    const blocks = []; let html = "", buf = [], kind = null, open = false, first = true;
    const flush = () => {
      if (!buf.length) return;
      if (kind === "p") { html += `<p${first && !open ? ' class="lead"' : ""}>${buf.map(esc).join("<br>")}</p>`; }
      else if (kind === "t") html += `<table class="st-tb"><tbody>${buf.map(r => { const i = r.indexOf("|"); const a = i < 0 ? r : r.slice(0, i), b = i < 0 ? "" : r.slice(i + 1); return `<tr><th scope="row">${esc(a.trim())}</th><td>${esc(b.trim())}</td></tr>`; }).join("")}</tbody></table>`;
      else if (kind === "q") html += `<p class="st-note">${buf.map(esc).join("<br>")}</p>`;
      buf = []; kind = null;
    };
    const endBlock = () => { flush(); if (html) { blocks.push({ html, sec: open }); } html = ""; };
    for (const raw of lines) {
      const ln = raw.trim();
      let k = null, body = ln;
      if (!ln) { flush(); continue; }
      if (ln.startsWith("## ")) { endBlock(); first = false; open = true; html = `<h3>${esc(ln.slice(3).trim())}</h3>`; continue; }
      if (/^- /.test(ln)) { k = "t"; body = ln.slice(2); }
      else if (/^>/.test(ln)) { k = "q"; body = ln.replace(/^>\s?/, ""); }
      else k = "p";
      if (kind && kind !== k) flush();
      kind = k; buf.push(body);
    }
    endBlock();
    /* 사진 나누기 : 맨 앞 1장 → 나머지는 각 단락 뒤에 고르게 (영상은 첫 단락 뒤) */
    const vids = media.filter(m => m.type === "video"), imgs = media.filter(m => m.type !== "video");
    const slots = Array.from({ length: blocks.length + 1 }, () => []);
    if (imgs.length) slots[0].push(imgs.shift());
    if (blocks.length) {
      vids.forEach(v => slots[1].push(v));
      const n = blocks.length;
      imgs.forEach((m, i) => slots[1 + Math.min(n - 1, Math.floor(i * n / imgs.length))].push(m));
    } else { vids.concat(imgs).forEach(m => slots[0].push(m)); }
    let k = 0;
    const one = m => m.type === "video"
      ? `<video src="${esc(m.src)}" autoplay muted loop playsinline preload="metadata"></video>`
      : `<img src="${esc(m.src)}" alt="${esc(name || "")} 사진 ${++k}" loading="lazy" decoding="async">`;
    const group = g => {
      if (!g.length) return "";
      const odd = g.length % 2 === 1;
      return `<div class="st-media${g.length === 1 ? " solo" : ""}">${g.map((m, i) => `<figure${odd && i === 0 ? ' class="wide"' : ""}>${one(m)}</figure>`).join("")}</div>`;
    };
    let out = group(slots[0]);
    blocks.forEach((b, i) => { out += b.sec ? `<section class="st-sec">${b.html}</section>` : b.html; out += group(slots[i + 1]); });
    return `<div class="story">${out}</div>`;
  };
})();

/* =====================================================================
   상품 사진 · 영상
   - PRODUCT_PHOTOS : 상품번호 → [사진 경로, ...]
     상세정보 글 사이사이에 순서대로 고르게 들어가고, 큰 사진 아래 작은 사진 줄에도 보여요.
     (n- 폴더 = 2026-11-10 새로 찍은 사진, c- 폴더 = 예전 스마트스토어 상세에서 사진만 잘라낸 것)
   - PRODUCT_VIDEOS : 상품번호 → [영상 경로, ...]  → 첫 소개 문단 바로 아래에 자동 재생(소리 없음)
   ===================================================================== */
window.PRODUCT_PHOTOS = {
  // 꼬꼬 안심 져키 (13장)
  "11288330864": ["shop/img/n-anshim/p01.jpg", "shop/img/n-anshim/p02.jpg", "shop/img/n-anshim/p03.jpg", "shop/img/n-anshim/p04.jpg", "shop/img/n-anshim/p05.jpg", "shop/img/n-anshim/p06.jpg", "shop/img/n-anshim/p07.jpg", "shop/img/anshim-photo/p01.jpg", "shop/img/anshim-photo/p02.jpg", "shop/img/anshim-photo/p03.jpg", "shop/img/anshim-photo/p04.jpg", "shop/img/anshim-photo/p05.jpg", "shop/img/anshim-photo/p06.jpg"],
  "12404512523": ["shop/img/n-anshim/p01.jpg", "shop/img/n-anshim/p02.jpg", "shop/img/n-anshim/p03.jpg", "shop/img/n-anshim/p04.jpg", "shop/img/n-anshim/p05.jpg", "shop/img/n-anshim/p06.jpg", "shop/img/n-anshim/p07.jpg", "shop/img/anshim-photo/p01.jpg", "shop/img/anshim-photo/p02.jpg", "shop/img/anshim-photo/p03.jpg", "shop/img/anshim-photo/p04.jpg", "shop/img/anshim-photo/p05.jpg", "shop/img/anshim-photo/p06.jpg"],
  // 야채꼬꼬칩 (20장)
  "11243749707": ["shop/img/n-kokochip/p01.jpg", "shop/img/n-kokochip/p02.jpg", "shop/img/n-kokochip/p03.jpg", "shop/img/n-kokochip/p04.jpg", "shop/img/n-kokochip/p05.jpg", "shop/img/n-kokochip/p06.jpg", "shop/img/n-kokochip/p07.jpg", "shop/img/n-kokochip/p08.jpg", "shop/img/n-kokochip/p09.jpg", "shop/img/n-kokochip/p10.jpg", "shop/img/n-kokochip/p11.jpg", "shop/img/n-kokochip/p12.jpg", "shop/img/n-kokochip/p13.jpg", "shop/img/n-kokochip/p14.jpg", "shop/img/kokochip-photo/p01.jpg", "shop/img/kokochip-photo/p02.jpg", "shop/img/kokochip-photo/p03.jpg", "shop/img/kokochip-photo/p04.jpg", "shop/img/kokochip-photo/p05.jpg", "shop/img/kokochip-photo/p06.jpg"],
  "12404542115": ["shop/img/n-kokochip/p01.jpg", "shop/img/n-kokochip/p02.jpg", "shop/img/n-kokochip/p03.jpg", "shop/img/n-kokochip/p04.jpg", "shop/img/n-kokochip/p05.jpg", "shop/img/n-kokochip/p06.jpg", "shop/img/n-kokochip/p07.jpg", "shop/img/n-kokochip/p08.jpg", "shop/img/n-kokochip/p09.jpg", "shop/img/n-kokochip/p10.jpg", "shop/img/n-kokochip/p11.jpg", "shop/img/n-kokochip/p12.jpg", "shop/img/n-kokochip/p13.jpg", "shop/img/n-kokochip/p14.jpg", "shop/img/kokochip-photo/p01.jpg", "shop/img/kokochip-photo/p02.jpg", "shop/img/kokochip-photo/p03.jpg", "shop/img/kokochip-photo/p04.jpg", "shop/img/kokochip-photo/p05.jpg", "shop/img/kokochip-photo/p06.jpg"],
  // 아이슬란드 열빙어 (12장)
  "11224529580": ["shop/img/photo-smelt/p01.jpg", "shop/img/photo-smelt/p02.jpg", "shop/img/photo-smelt/p03.jpg", "shop/img/photo-smelt/p04.jpg", "shop/img/photo-smelt/p05.jpg", "shop/img/photo-smelt/p06.jpg", "shop/img/photo-smelt/p07.jpg", "shop/img/photo-smelt/p08.jpg", "shop/img/photo-smelt/p09.jpg", "shop/img/photo-smelt/p10.jpg", "shop/img/photo-smelt/p11.jpg", "shop/img/photo-smelt/p12.jpg"],
  "12404521217": ["shop/img/photo-smelt/p01.jpg", "shop/img/photo-smelt/p02.jpg", "shop/img/photo-smelt/p03.jpg", "shop/img/photo-smelt/p04.jpg", "shop/img/photo-smelt/p05.jpg", "shop/img/photo-smelt/p06.jpg", "shop/img/photo-smelt/p07.jpg", "shop/img/photo-smelt/p08.jpg", "shop/img/photo-smelt/p09.jpg", "shop/img/photo-smelt/p10.jpg", "shop/img/photo-smelt/p11.jpg", "shop/img/photo-smelt/p12.jpg"],
  // 칠레산 코호 연어 큐브 (16장)
  "11227631311": ["shop/img/n-salmon/p01.jpg", "shop/img/n-salmon/p02.jpg", "shop/img/n-salmon/p03.jpg", "shop/img/n-salmon/p04.jpg", "shop/img/n-salmon/p05.jpg", "shop/img/n-salmon/p06.jpg", "shop/img/n-salmon/p07.jpg", "shop/img/photo-salmon/p01.jpg", "shop/img/photo-salmon/p02.jpg", "shop/img/photo-salmon/p03.jpg", "shop/img/photo-salmon/p04.jpg", "shop/img/photo-salmon/p05.jpg", "shop/img/photo-salmon/p06.jpg", "shop/img/photo-salmon/p07.jpg", "shop/img/photo-salmon/p08.jpg", "shop/img/photo-salmon/p09.jpg"],
  "12404537428": ["shop/img/n-salmon/p01.jpg", "shop/img/n-salmon/p02.jpg", "shop/img/n-salmon/p03.jpg", "shop/img/n-salmon/p04.jpg", "shop/img/n-salmon/p05.jpg", "shop/img/n-salmon/p06.jpg", "shop/img/n-salmon/p07.jpg", "shop/img/photo-salmon/p01.jpg", "shop/img/photo-salmon/p02.jpg", "shop/img/photo-salmon/p03.jpg", "shop/img/photo-salmon/p04.jpg", "shop/img/photo-salmon/p05.jpg", "shop/img/photo-salmon/p06.jpg", "shop/img/photo-salmon/p07.jpg", "shop/img/photo-salmon/p08.jpg", "shop/img/photo-salmon/p09.jpg"],
  // 오리야채스틱 (21장)
  "12586050184": ["shop/img/n-duckstick/p01.jpg", "shop/img/n-duckstick/p02.jpg", "shop/img/n-duckstick/p03.jpg", "shop/img/n-duckstick/p04.jpg", "shop/img/n-duckstick/p05.jpg", "shop/img/n-duckstick/p06.jpg", "shop/img/n-duckstick/p07.jpg", "shop/img/n-duckstick/p08.jpg", "shop/img/n-duckstick/p09.jpg", "shop/img/photo-duckstick/p01.jpg", "shop/img/photo-duckstick/p02.jpg", "shop/img/photo-duckstick/p03.jpg", "shop/img/photo-duckstick/p04.jpg", "shop/img/photo-duckstick/p05.jpg", "shop/img/photo-duckstick/p06.jpg", "shop/img/photo-duckstick/p07.jpg", "shop/img/photo-duckstick/p08.jpg", "shop/img/photo-duckstick/p09.jpg", "shop/img/photo-duckstick/p10.jpg", "shop/img/photo-duckstick/p11.jpg", "shop/img/photo-duckstick/p12.jpg"],
  // 오리 울대 (25장)
  "11319239090": ["shop/img/n-duckneck/p01.jpg", "shop/img/n-duckneck/p02.jpg", "shop/img/n-duckneck/p03.jpg", "shop/img/n-duckneck/p04.jpg", "shop/img/n-duckneck/p05.jpg", "shop/img/n-duckneck/p06.jpg", "shop/img/photo-duckneck/p01.jpg", "shop/img/photo-duckneck/p02.jpg", "shop/img/photo-duckneck/p03.jpg", "shop/img/photo-duckneck/p04.jpg", "shop/img/photo-duckneck/p05.jpg", "shop/img/photo-duckneck/p06.jpg", "shop/img/photo-duckneck/p07.jpg", "shop/img/photo-duckneck/p08.jpg", "shop/img/photo-duckneck/p09.jpg", "shop/img/photo-duckneck/p10.jpg", "shop/img/photo-duckneck/p11.jpg", "shop/img/photo-duckneck/p12.jpg", "shop/img/photo-duckneck/p13.jpg", "shop/img/photo-duckneck/p14.jpg", "shop/img/photo-duckneck/p15.jpg", "shop/img/photo-duckneck/p16.jpg", "shop/img/photo-duckneck/p17.jpg", "shop/img/photo-duckneck/p18.jpg", "shop/img/photo-duckneck/p19.jpg"],
  // 우피오리야채말이 (22장)
  "12400730936": ["shop/img/n-duckroll/p01.jpg", "shop/img/n-duckroll/p02.jpg", "shop/img/n-duckroll/p03.jpg", "shop/img/n-duckroll/p04.jpg", "shop/img/n-duckroll/p05.jpg", "shop/img/photo-duckroll/p01.jpg", "shop/img/photo-duckroll/p02.jpg", "shop/img/photo-duckroll/p03.jpg", "shop/img/photo-duckroll/p04.jpg", "shop/img/photo-duckroll/p05.jpg", "shop/img/photo-duckroll/p06.jpg", "shop/img/photo-duckroll/p07.jpg", "shop/img/photo-duckroll/p08.jpg", "shop/img/photo-duckroll/p09.jpg", "shop/img/photo-duckroll/p10.jpg", "shop/img/photo-duckroll/p11.jpg", "shop/img/photo-duckroll/p12.jpg", "shop/img/photo-duckroll/p13.jpg", "shop/img/photo-duckroll/p14.jpg", "shop/img/photo-duckroll/p15.jpg", "shop/img/photo-duckroll/p16.jpg", "shop/img/photo-duckroll/p17.jpg"],
  // 오리 연근칩 (25장)
  "pt-lotuschip": ["shop/img/n-lotus/p01.jpg", "shop/img/n-lotus/p02.jpg", "shop/img/n-lotus/p03.jpg", "shop/img/n-lotus/p04.jpg", "shop/img/n-lotus/p05.jpg", "shop/img/n-lotus/p06.jpg", "shop/img/n-lotus/p07.jpg", "shop/img/n-lotus/p08.jpg", "shop/img/n-lotus/p09.jpg", "shop/img/photo-lotus/p01.jpg", "shop/img/photo-lotus/p02.jpg", "shop/img/photo-lotus/p03.jpg", "shop/img/photo-lotus/p04.jpg", "shop/img/photo-lotus/p05.jpg", "shop/img/photo-lotus/p06.jpg", "shop/img/photo-lotus/p07.jpg", "shop/img/photo-lotus/p08.jpg", "shop/img/photo-lotus/p09.jpg", "shop/img/photo-lotus/p10.jpg", "shop/img/photo-lotus/p11.jpg", "shop/img/photo-lotus/p12.jpg", "shop/img/photo-lotus/p13.jpg", "shop/img/photo-lotus/p14.jpg", "shop/img/photo-lotus/p15.jpg", "shop/img/photo-lotus/p16.jpg"],
  // 말랑 우유껌 (10장)
  "11250116756": ["shop/img/n-milk/p01.jpg", "shop/img/n-milk/p02.jpg", "shop/img/n-milk/p03.jpg", "shop/img/n-milk/p04.jpg", "shop/img/n-milk/p05.jpg", "shop/img/n-milk/p06.jpg", "shop/img/c-11250116756/p01.jpg", "shop/img/c-11250116756/p02.jpg", "shop/img/c-11250116756/p03.jpg", "shop/img/c-11250116756/p04.jpg"],
  // 연어 껍질 (10장)
  "12026261803": ["shop/img/n-skin/p01.jpg", "shop/img/n-skin/p02.jpg", "shop/img/n-skin/p03.jpg", "shop/img/n-skin/p04.jpg", "shop/img/n-skin/p05.jpg", "shop/img/n-skin/p06.jpg", "shop/img/n-skin/p07.jpg", "shop/img/n-skin/p08.jpg", "shop/img/n-skin/p09.jpg", "shop/img/n-skin/p10.jpg"],
  // 칠면조 힘줄 터키츄 (16장)
  "13441996522": ["shop/img/n-turkey/p01.jpg", "shop/img/n-turkey/p02.jpg", "shop/img/n-turkey/p03.jpg", "shop/img/n-turkey/p04.jpg", "shop/img/n-turkey/p05.jpg", "shop/img/n-turkey/p06.jpg", "shop/img/n-turkey/p07.jpg", "shop/img/n-turkey/p08.jpg", "shop/img/n-turkey/p09.jpg", "shop/img/n-turkey/p10.jpg", "shop/img/n-turkey/p11.jpg", "shop/img/n-turkey/p12.jpg", "shop/img/n-turkey/p13.jpg", "shop/img/n-turkey/p14.jpg", "shop/img/n-turkey/p15.jpg", "shop/img/n-turkey/p16.jpg"],
  // 강아지 테린 (13장)
  "11244043465": ["shop/img/n-terrine/p01.jpg", "shop/img/n-terrine/p02.jpg", "shop/img/n-terrine/p03.jpg", "shop/img/n-terrine/p04.jpg", "shop/img/n-terrine/p05.jpg", "shop/img/n-terrine/p06.jpg", "shop/img/n-terrine/p07.jpg", "shop/img/n-terrine/p08.jpg", "shop/img/n-terrine/p09.jpg", "shop/img/n-terrine/p10.jpg", "shop/img/n-terrine/p11.jpg", "shop/img/n-terrine/p12.jpg", "shop/img/n-terrine/p13.jpg"],
  // 통 닭가슴살 져키 (15장)
  "12026221104": ["shop/img/n-breast/p01.jpg", "shop/img/n-breast/p02.jpg", "shop/img/n-breast/p03.jpg", "shop/img/n-breast/p04.jpg", "shop/img/n-breast/p05.jpg", "shop/img/n-breast/p06.jpg", "shop/img/n-breast/p07.jpg", "shop/img/n-breast/p08.jpg", "shop/img/n-breast/p09.jpg", "shop/img/n-breast/p10.jpg", "shop/img/n-breast/p11.jpg", "shop/img/n-breast/p12.jpg", "shop/img/n-breast/p13.jpg", "shop/img/n-breast/p14.jpg", "shop/img/n-breast/p15.jpg"],
  // 두부 후르츠링 (할로윈) (4장)
  "10833175823": ["shop/img/c-10833175823/p01.jpg", "shop/img/c-10833175823/p02.jpg", "shop/img/c-10833175823/p03.jpg", "shop/img/c-10833175823/p04.jpg"],
  "11888082495": ["shop/img/c-10833175823/p01.jpg", "shop/img/c-10833175823/p02.jpg", "shop/img/c-10833175823/p03.jpg", "shop/img/c-10833175823/p04.jpg"],
  // 리본 모양 두부 후르츠링 (5장)
  "12279890723": ["shop/img/c-12279890723/p01.jpg", "shop/img/c-12279890723/p02.jpg", "shop/img/c-12279890723/p03.jpg", "shop/img/c-12279890723/p04.jpg", "shop/img/c-12279890723/p05.jpg"],
  // 코코넛 고구마 볼 (6장)
  "10829745766": ["shop/img/c-10829745766/p01.jpg", "shop/img/c-10829745766/p02.jpg", "shop/img/c-10829745766/p03.jpg", "shop/img/c-10829745766/p04.jpg", "shop/img/c-10829745766/p05.jpg", "shop/img/c-10829745766/p06.jpg"],
  // 코코넛 고구마 볼 (대용량) (6장)
  "12404550727": ["shop/img/c-12404550727/p01.jpg", "shop/img/c-12404550727/p02.jpg", "shop/img/c-12404550727/p03.jpg", "shop/img/c-12404550727/p04.jpg", "shop/img/c-12404550727/p05.jpg", "shop/img/c-12404550727/p06.jpg"],
  // 야채 퓨레 옐로우 (3장)
  "12026300387": ["shop/img/c-12026300387/p01.jpg", "shop/img/c-12026300387/p02.jpg", "shop/img/c-12026300387/p03.jpg"],
  // 야채 퓨레 옐로우 (대용량) (3장)
  "12404494073": ["shop/img/c-12404494073/p01.jpg", "shop/img/c-12404494073/p02.jpg", "shop/img/c-12404494073/p03.jpg"],
  // 야채 퓨레 그린 (2장)
  "12026326721": ["shop/img/c-12026326721/p01.jpg", "shop/img/c-12026326721/p02.jpg"],
  // 야채 퓨레 그린 (대용량) (3장)
  "12404488806": ["shop/img/c-12404488806/p01.jpg", "shop/img/c-12404488806/p02.jpg", "shop/img/c-12404488806/p03.jpg"],
  // 수비드 닭가슴살 (2장)
  "13441734953": ["shop/img/c-13441734953/p02.jpg", "shop/img/c-13441734953/p03.jpg"]
};
window.PRODUCT_VIDEOS = {
  "11243749707": ["shop/img/n-kokochip/v01.mp4", "shop/img/n-kokochip/v02.mp4", "shop/img/n-kokochip/v03.mp4"],
  "12404542115": ["shop/img/n-kokochip/v01.mp4", "shop/img/n-kokochip/v02.mp4", "shop/img/n-kokochip/v03.mp4"],
  "12026221104": ["shop/img/n-breast/v01.mp4"]
};
/* 대표사진(썸네일)과 같은 원본 사진 : 작은 사진 줄에서는 빼고 보여줘요 */
window.PRODUCT_PHOTOS_LEAD = {
  "11243749707": "shop/img/kokochip-photo/p01.jpg",
  "12404542115": "shop/img/kokochip-photo/p01.jpg",
  "pt-lotuschip": "shop/img/photo-lotus/p01.jpg"
};
