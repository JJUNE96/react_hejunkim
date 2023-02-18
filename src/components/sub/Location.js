import Layout from '../common/Layout';
import { useRef, useEffect } from 'react';

function Location() {
	const container = useRef(null);

	//윈도우 객체에서 kakao 객체를 비구조화할당으로 바로 할당
	const { kakao } = window;

	const option = {
		center: new kakao.maps.LatLng(35.1631139, 129.1635509),
		level: 3,
	};

	// const map = new kakao.maps.Map(container.current, option);

	// const showTraffic = map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

	// const hideTraffic = map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

	//마커 위치 인스턴스 생성
	const markerPosition = option.center;

	//실제 마커 생성
	const marker = new kakao.maps.Marker({
		position: markerPosition,
	});

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(container.current, option);
		// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
		const mapTypeControl = new kakao.maps.MapTypeControl();

		// 지도 타입 컨트롤을 지도에 표시합니다
		mapInstance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

		//마커 생성 호출구문
		marker.setMap(mapInstance);

		// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
		const zoomControl = new kakao.maps.ZoomControl();
		mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

		mapInstance.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

		// function showTraffic() {
		// 	mapInstance.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		// }

		// function closeTraffic() {
		// 	mapInstance.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		// }

		function getInfo() {
			// 지도의 현재 중심좌표를 얻어옵니다
			var center = mapInstance.getCenter();

			// 지도의 현재 레벨을 얻어옵니다
			var level = mapInstance.getLevel();

			// 지도타입을 얻어옵니다
			var mapTypeId = mapInstance.getMapTypeId();

			// 지도의 현재 영역을 얻어옵니다
			var bounds = mapInstance.getBounds();

			// 영역의 남서쪽 좌표를 얻어옵니다
			var swLatLng = bounds.getSouthWest();

			// 영역의 북동쪽 좌표를 얻어옵니다
			var neLatLng = bounds.getNorthEast();

			// 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
			var boundsStr = bounds.toString();

			var message = '지도 중심좌표는 위도 ' + center.getLat() + ', <br>';
			message += '경도 ' + center.getLng() + ' 이고 <br>';
			message += '지도 레벨은 ' + level + ' 입니다 <br> <br>';
			message += '지도 타입은 ' + mapTypeId + ' 이고 <br> ';
			message +=
				'지도의 남서쪽 좌표는 ' +
				swLatLng.getLat() +
				', ' +
				swLatLng.getLng() +
				' 이고 <br>';
			message +=
				'북동쪽 좌표는 ' + neLatLng.getLat() + ', ' + neLatLng.getLng() + ' 입니다';
		}
	}, []);

	return (
		<Layout name={'Location / 위치'}>
			<div id='map' ref={container}></div>
			{/* <ul className='traffic'>
				<li> 교통정보 보기</li>
				<li>교통정보 끄기</li>
			</ul> */}
		</Layout>
	);
}

export default Location;
