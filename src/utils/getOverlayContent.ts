import { Place } from '@types';

const createElement = (tagName: string, className?: string, content?: any) => {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (content) {
    if (typeof content === 'string') {
      element.innerHTML = content;
    } else {
      element.append(...content);
    }
  }

  return element;
};

const getOverlayContent = (place: Place, closeOverlay: () => void, length: string) => {
  const closeBtn = createElement('button', 'button', '✕');
  closeBtn.onclick = () => closeOverlay();
  const link = createElement('a', 'link', '길찾기') as HTMLAnchorElement;
  link.href = `https://map.kakao.com/link/to/${place.id}`;
  const category = createElement('span', 'category', place.category_group_name);
  const title = createElement('strong', 'title', [place.place_name, category]);
  const roadAddress = createElement('p', 'road-address', place.road_address_name);
  const address = createElement('p', 'address', place.address_name);
  const distance = createElement('span', 'distance', length);
  const phone = createElement('span', 'phone', place.phone);
  const etc = createElement('p', 'etc', [distance, phone, link]);
  const inner = createElement('div', 'content', [title, roadAddress, address, etc]);
  const content = createElement('div', 'info-window', [closeBtn, inner]);

  return content;
};

export default getOverlayContent;
