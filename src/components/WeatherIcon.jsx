import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  MoonStar,
  SunMedium,
} from 'lucide-react';

const ICON_MAP = {
  clear: SunMedium,
  'night-clear': MoonStar,
  clouds: Cloud,
  'partly-cloudy': CloudSun,
  'night-clouds': CloudMoon,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  sleet: CloudSnow,
  rain: CloudRain,
  snow: CloudSnow,
  storm: CloudLightning,
};

export default function WeatherIcon({
  icon = 'clear',
  className = '',
  size = 28,
  strokeWidth = 1.8,
}) {
  const IconComponent = ICON_MAP[icon] ?? Cloud;

  return (
    <IconComponent
      className={className}
      size={size}
      strokeWidth={strokeWidth}
    />
  );
}
