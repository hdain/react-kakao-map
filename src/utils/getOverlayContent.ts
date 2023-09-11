import { Place } from '@types';

interface GetOverlayContentProps {
  place: Place;
  distance: string;
}

const getOverlayContent = ({ place, distance }: GetOverlayContentProps) => `
  <div class='info-window absolute bottom-12 left-1/2 -translate-x-1/2 bg-white border border-gray-300 rounded-md'>
    <button class='absolute right-3 top-2.5 border-0 bg-none p-0 text-lg cursor-pointer' id='${place.id}'>✕</button>
    <div class='p-3'>
      <strong class='block pr-6 pb-3 border-b border-gray-200'>${place.place_name}
        <span class='text-gray-900 text-xs align-middle pl-1'>${place.category_group_name}</span>
      </strong>
      <p class='text-sm m-0 pt-1 pt-3'>${place.road_address_name}</p>
      <p class='text-sm m-0 pt-1 text-gray-900'>${place.address_name}</p>
      <p class='text-sm m-0 pt-1'>
        <span class='mr-2'>${distance}</span>
        <span class='text-green-700'>${place.phone}</span>
        <a href="https://map.kakao.com/link/to/${place.id}" class='float-right text-blue-700 font-bold'>길찾기</a>
      </p>
    </div>
  </div>
  `;

export default getOverlayContent;
