export default {
	items: [
		{
			name: 'Trang chủ',
			url: '/dashboard',
		},
		{
			title: true,
			name: 'Tài xế',
			wrapper: {
				// optional wrapper object
				element: '', // required valid HTML5 element tag
				attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
			},
			class: '', // optional class names space delimited list for title item ex: "text-center"
		},
		{
			name: 'Danh sách tài xế',
			url: '/driver/list',
			icon: 'icon-user',
		},
		{
			name: 'Thêm tài xế',
			url: '/driver/add',
			icon: 'icon-user-follow',
		},
		{
			title: true,
			name: 'Hành trình',
		},
		{
			name: 'Xe 2 điểm',
			url: '/theme/colors',
			icon: 'icon-location-pin',
		},
		{
			name: 'Xe đa điểm',
			url: '/theme/colors',
			icon: 'icon-location-pin',
		},
		{
			title: true,
			name: 'Danh sách xe',
		},
		{
			name: 'Quản lý xe',
			url: '/vehicle/list',
			icon: 'fa fa-car',
		},
		{
			title: true,
			name: 'Quản lý tài khoản',
		},
		{
			name: 'Tài khỏa người dùng',
			url: '/user/list',
			icon: 'fa fa-user-o',
		},
		{
			name: 'Tài khỏa admin',
			url: '/admin/list',
			icon: 'fa fa-user-secret',
		},
		{
			title: true,
			name: 'Tin tức',
		},
		{
			name: 'Quản lý tin tức',
			url: '/news/list',
			icon: 'fa fa-user-secret',
		},
		{
			name: 'Thêm tin tức mới',
			url: '/news/add',
			icon: 'fa fa-user-secret',
		},
		{
			title: true,
			name: 'Thống kê',
		},
		{
			name: 'Thống kê tổng quan',
			url: '/theme/colors',
			icon: 'fa fa-bar-chart',
		},
		{
			name: 'Thống kê chuyến đi',
			url: '/theme/colors',
			icon: 'fa fa-bar-chart',
		},
		{
			name: 'Thống kê doanh thu',
			url: '/theme/colors',
			icon: 'fa fa-bar-chart',
		},
		{
			name: 'Thống kê tài xế',
			url: '/theme/colors',
			icon: 'fa fa-bar-chart',
		},
		{
			name: 'Thống kê xe',
			url: '/theme/colors',
			icon: 'fa fa-bar-chart',
		},
	],
};
