type WeatherCodeMap = {
	[key: string]: string;
};

export interface WeatherCodesCollection {
	weatherCode: WeatherCodeMap;
	weatherCodeFullDay: WeatherCodeMap;
	weatherCodeDay: WeatherCodeMap;
	weatherCodeNight: WeatherCodeMap;
}
