import Layout from '../common/Layout';
import { useRef, useEffect, useMemo } from 'react';

function Location() {
	const container = useRef(null);
	const mapInstance = useRef(null);
	const option = useRef(null);
	const { kakao } = window;

	option.current = {
		center: new kakao.maps.LatLng(35.1631139, 129.1635509),
		level: 3,
	};

	const imageSrc = `${process.env.PUBLIC_URL}/img/map.png`;
	const imageSize = useMemo(() => new kakao.maps.Size(120, 60), [kakao]);
	const imageOption = useMemo(() => new kakao.maps.Point(50, 62), [kakao]);

	const markerImage = useMemo(
		() => new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
		[kakao, imageSrc, imageOption, imageSize]
	);
	const markerPosition = option.current.center;

	const marker = useMemo(
		() =>
			new kakao.maps.Marker({
				position: markerPosition,
				image: markerImage,
			}),
		[kakao, markerImage, markerPosition]
	);

	useEffect(() => {
		mapInstance.current = new kakao.maps.Map(container.current, option.current);
		const mapTypeControl = new kakao.maps.MapTypeControl();

		mapInstance.current.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

		marker.setMap(mapInstance.current);

		const zoomControl = new kakao.maps.ZoomControl();
		mapInstance.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

		function getInfo() {
			// 지도의 현재 중심좌표를 얻어옵니다
			let center = mapInstance.current.getCenter();

			// 지도의 현재 레벨을 얻어옵니다
			let level = mapInstance.current.getLevel();

			// 지도타입을 얻어옵니다
			let mapTypeId = mapInstance.current.getMapTypeId();

			// 지도의 현재 영역을 얻어옵니다
			let bounds = mapInstance.current.getBounds();

			// 영역의 남서쪽 좌표를 얻어옵니다
			let swLatLng = bounds.getSouthWest();

			// 영역의 북동쪽 좌표를 얻어옵니다
			let neLatLng = bounds.getNorthEast();

			// 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
			//let boundsStr = bounds.toString();

			let message = '지도 중심좌표는 위도 ' + center.getLat() + ', <br>';
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

			mapInstance.current.setCenter(moveLatLon);
		};
		mapInstance.current.setZoomable(false);

		//브라우저 리사이즈 될떄마다 마커 가운데 위치시키는 함수 호출
		window.addEventListener('resize', setCenter);

		//해당 컴포넌트 unmount시 setCenter함수 이벤트 제거
		return () => {
			window.removeEventListener('resize', setCenter);
		};
	}, [kakao, marker]);

	function showTraffic() {
		mapInstance.current = new kakao.maps.Map(container.current, option.current);
		mapInstance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		marker.setMap(mapInstance.current);
	}

	function closeTraffic() {
		mapInstance.current = new kakao.maps.Map(container.current, option.current);

		mapInstance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		marker.setMap(mapInstance.current);
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
