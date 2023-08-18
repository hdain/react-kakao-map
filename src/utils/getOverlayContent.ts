// 문자열이 아닌 DOM API로 Element를 직접 생성하여 구성해야 함
const getOverlayContent = (place: any, closeOverlay: any, length: string) => {
  const content = document.createElement('div');
  content.className = 'info-window';
  const closeBtn = document.createElement('button');
  closeBtn.append('✕');
  closeBtn.onclick = () => closeOverlay();
  const inner = document.createElement('div');
  inner.className = 'content';
  const title = document.createElement('strong');
  title.className = 'title';
  const category = document.createElement('span');
  category.className = 'category';
  category.append(place.category_group_name);
  title.append(place.place_name, category);
  const roadAddress = document.createElement('p');
  roadAddress.className = 'road-address';
  roadAddress.append(place.road_address_name);
  const address = document.createElement('p');
  address.className = 'address';
  address.append(place.address_name);
  const distance = document.createElement('span');
  distance.className = 'distance';
  distance.append(length);
  const phone = document.createElement('span');
  phone.className = 'phone';
  phone.append(place.phone);
  const link = document.createElement('a');
  const url = `https://map.kakao.com/link/to/${place.id}`;
  link.className = 'link';
  link.href = url;
  link.append('길찾기');
  const etc = document.createElement('p');
  etc.className = 'etc';
  etc.append(distance, phone, link);
  inner.append(title, roadAddress, address, etc);
  content.append(closeBtn, inner);

  return content;
};

export default getOverlayContent;
