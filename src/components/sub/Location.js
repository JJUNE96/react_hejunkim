import Layout from '../common/Layout';
import { useRef, useEffect } from 'react';

function Location() {
	const container = useRef(null);

	const { kakao } = window;

	const option = {
		center: new kakao.maps.LatLng(35.1631139, 129.1635509),
		level: 3,
	};

	const markerPosition = option.center;

	const marker = new kakao.maps.Marker({
		position: markerPosition,
	});

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(container.current, option);
		const mapTypeControl = new kakao.maps.MapTypeControl();

		mapInstance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

		marker.setMap(mapInstance);

		const zoomControl = new kakao.maps.ZoomControl();
		mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

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
		//지도 가운데 이동 함수
		const setCenter = () => {
			let moveLatLon = new kakao.maps.LatLng(35.1631139, 129.1635509);

			mapInstance.setCenter(moveLatLon);
		};
		mapInstance.setZoomable(false);

		//브라우저 리사이즈 될떄마다 마커 가운데 위치시키는 함수 호출
		window.addEventListener('resize', setCenter);

		//해당 컴포넌트 unmount시 setCenter함수 이벤트 제거
		return () => {
			window.removeEventListener('resize', setCenter);
		};
	}, []);

	function showTraffic() {
		const mapInstance = new kakao.maps.Map(container.current, option);
		mapInstance.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		marker.setMap(mapInstance);
	}

	function closeTraffic() {
		const mapInstance = new kakao.maps.Map(container.current, option);

		mapInstance.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		marker.setMap(mapInstance);
	}

	return (
		<Layout name={'Location / 위치'}>
			<>
				<div id='map' ref={container}></div>
				<div className='traffic'>
					<button onClick={showTraffic}>교통정보 보기</button>
					<button onClick={closeTraffic}>교통정보 끄기</button>
				</div>
			</>
		</Layout>
	);
}

export default Location;
