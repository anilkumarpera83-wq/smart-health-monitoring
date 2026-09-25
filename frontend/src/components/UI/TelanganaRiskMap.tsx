import React, { useEffect, useMemo, useState } from 'react';
import {
  MapPin,
  Search,
  Info,
} from 'lucide-react';

import {
  GeoJSON,
  MapContainer,
  TileLayer,
  useMap,
} from 'react-leaflet';

import type {
  Feature,
  FeatureCollection,
  Geometry,
} from 'geojson';

import 'leaflet/dist/leaflet.css';

export interface DistrictRiskData {
  id: string;
  name: string;
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  cases: number;
  waterQuality: string;
  mandalCount: number;
  activeOutbreak: string;
  hq: string;
}

/*
 * Existing health-risk data.
 * The old SVG path/cx/cy values have been removed because
 * the real geographical boundaries now come from GeoJSON.
 */
export const TELANGANA_DISTRICTS_DATA: DistrictRiskData[] = [
  {
    id: 'ADB',
    name: 'Adilabad',
    hq: 'Adilabad',
    level: 'CRITICAL',
    cases: 142,
    waterQuality: 'POOR (pH 5.6, E. coli)',
    mandalCount: 18,
    activeOutbreak: 'Cholera & Diarrhea',
  },
  {
    id: 'KBA',
    name: 'Kumuram Bheem Asifabad',
    hq: 'Asifabad',
    level: 'HIGH',
    cases: 98,
    waterQuality: 'MODERATE (Turbidity 4.2)',
    mandalCount: 15,
    activeOutbreak: 'Gastroenteritis',
  },
  {
    id: 'MNCL',
    name: 'Mancherial',
    hq: 'Mancherial',
    level: 'MEDIUM',
    cases: 54,
    waterQuality: 'SAFE (pH 7.1)',
    mandalCount: 16,
    activeOutbreak: 'Mild Typhoid',
  },
  {
    id: 'NRML',
    name: 'Nirmal',
    hq: 'Nirmal',
    level: 'HIGH',
    cases: 87,
    waterQuality: 'POOR (High Nitrates)',
    mandalCount: 19,
    activeOutbreak: 'Hepatitis A',
  },
  {
    id: 'NZB',
    name: 'Nizamabad',
    hq: 'Nizamabad',
    level: 'CRITICAL',
    cases: 165,
    waterQuality: 'POOR (E. coli positive)',
    mandalCount: 27,
    activeOutbreak: 'Severe Typhoid Outbreak',
  },
  {
    id: 'KMR',
    name: 'Kamareddy',
    hq: 'Kamareddy',
    level: 'HIGH',
    cases: 112,
    waterQuality: 'MODERATE',
    mandalCount: 22,
    activeOutbreak: 'Diarrheal Cluster',
  },
  {
    id: 'JGL',
    name: 'Jagtial',
    hq: 'Jagtial',
    level: 'MEDIUM',
    cases: 62,
    waterQuality: 'SAFE',
    mandalCount: 18,
    activeOutbreak: 'None Reported',
  },
  {
    id: 'PED',
    name: 'Peddapalli',
    hq: 'Peddapalli',
    level: 'LOW',
    cases: 28,
    waterQuality: 'SAFE (TDS 180)',
    mandalCount: 14,
    activeOutbreak: 'None Reported',
  },
  {
    id: 'RJS',
    name: 'Rajanna Sircilla',
    hq: 'Sircilla',
    level: 'MEDIUM',
    cases: 48,
    waterQuality: 'MODERATE',
    mandalCount: 13,
    activeOutbreak: 'Seasonal Fever',
  },
  {
    id: 'KNR',
    name: 'Karimnagar',
    hq: 'Karimnagar',
    level: 'CRITICAL',
    cases: 189,
    waterQuality: 'POOR (Coliform 340/100ml)',
    mandalCount: 16,
    activeOutbreak: 'Acute Waterborne Outbreak',
  },
  {
    id: 'JSB',
    name: 'Jayashankar Bhupalpally',
    hq: 'Bhupalpally',
    level: 'HIGH',
    cases: 94,
    waterQuality: 'POOR',
    mandalCount: 11,
    activeOutbreak: 'Malaria & Dysentery',
  },
  {
    id: 'MUL',
    name: 'Mulugu',
    hq: 'Mulugu',
    level: 'HIGH',
    cases: 82,
    waterQuality: 'MODERATE',
    mandalCount: 9,
    activeOutbreak: 'Gastroenteritis',
  },
  {
    id: 'HNK',
    name: 'Hanamkonda',
    hq: 'Hanamkonda',
    level: 'CRITICAL',
    cases: 178,
    waterQuality: 'POOR (Heavy Metals)',
    mandalCount: 12,
    activeOutbreak: 'Dengue & Waterborne Fever',
  },
  {
    id: 'WGL',
    name: 'Warangal',
    hq: 'Warangal',
    level: 'CRITICAL',
    cases: 195,
    waterQuality: 'POOR (Bacterial Contamination)',
    mandalCount: 13,
    activeOutbreak: 'Diarrhea Cluster',
  },
  {
    id: 'MHB',
    name: 'Mahabubabad',
    hq: 'Mahabubabad',
    level: 'MEDIUM',
    cases: 59,
    waterQuality: 'SAFE',
    mandalCount: 16,
    activeOutbreak: 'None Reported',
  },
  {
    id: 'BDK',
    name: 'Bhadradri Kothagudem',
    hq: 'Kothagudem',
    level: 'HIGH',
    cases: 124,
    waterQuality: 'POOR (Industrial Effluent Alert)',
    mandalCount: 23,
    activeOutbreak: 'Typhoid & Malaria',
  },
  {
    id: 'SDP',
    name: 'Siddipet',
    hq: 'Siddipet',
    level: 'HIGH',
    cases: 104,
    waterQuality: 'MODERATE',
    mandalCount: 24,
    activeOutbreak: 'Diarrhea',
  },
  {
    id: 'JNG',
    name: 'Jangaon',
    hq: 'Jangaon',
    level: 'MEDIUM',
    cases: 41,
    waterQuality: 'SAFE',
    mandalCount: 12,
    activeOutbreak: 'None Reported',
  },
  {
    id: 'YAD',
    name: 'Yadadri Bhuvanagiri',
    hq: 'Bhuvanagiri',
    level: 'MEDIUM',
    cases: 52,
    waterQuality: 'MODERATE',
    mandalCount: 17,
    activeOutbreak: 'Mild Diarrhea',
  },
  {
    id: 'MDC',
    name: 'Medchal-Malkajgiri',
    hq: 'Shamirpet',
    level: 'HIGH',
    cases: 138,
    waterQuality: 'POOR (Urban Overflow)',
    mandalCount: 15,
    activeOutbreak: 'Gastroenteritis',
  },
  {
    id: 'HYD',
    name: 'Hyderabad',
    hq: 'Hyderabad',
    level: 'CRITICAL',
    cases: 285,
    waterQuality: 'CRITICAL (Drainage Leakage)',
    mandalCount: 16,
    activeOutbreak: 'Acute Cholera & Dengue Alert',
  },
  {
    id: 'SNG',
    name: 'Sangareddy',
    hq: 'Sangareddy',
    level: 'MEDIUM',
    cases: 68,
    waterQuality: 'MODERATE',
    mandalCount: 26,
    activeOutbreak: 'None Reported',
  },
  {
    id: 'VKR',
    name: 'Vikarabad',
    hq: 'Vikarabad',
    level: 'LOW',
    cases: 22,
    waterQuality: 'SAFE',
    mandalCount: 18,
    activeOutbreak: 'None Reported',
  },
  {
    id: 'RR',
    name: 'Ranga Reddy',
    hq: 'Shamshabad',
    level: 'HIGH',
    cases: 146,
    waterQuality: 'POOR (High Hardness)',
    mandalCount: 27,
    activeOutbreak: 'Waterborne Typhoid',
  },
  {
    id: 'NLG',
    name: 'Nalgonda',
    hq: 'Nalgonda',
    level: 'HIGH',
    cases: 118,
    waterQuality: 'POOR (High Fluoride)',
    mandalCount: 31,
    activeOutbreak: 'Gastroenteritis',
  },
  {
    id: 'SRPT',
    name: 'Suryapet',
    hq: 'Suryapet',
    level: 'MEDIUM',
    cases: 64,
    waterQuality: 'SAFE',
    mandalCount: 23,
    activeOutbreak: 'Seasonal Fever',
  },
  {
    id: 'KHM',
    name: 'Khammam',
    hq: 'Khammam',
    level: 'CRITICAL',
    cases: 210,
    waterQuality: 'POOR (E. coli & Salmonella)',
    mandalCount: 21,
    activeOutbreak: 'Severe Typhoid Outbreak',
  },
  {
    id: 'MBN',
    name: 'Mahbubnagar',
    hq: 'Mahbubnagar',
    level: 'MEDIUM',
    cases: 54,
    waterQuality: 'SAFE',
    mandalCount: 26,
    activeOutbreak: 'None Reported',
  },
  {
    id: 'NRP',
    name: 'Narayanpet',
    hq: 'Narayanpet',
    level: 'LOW',
    cases: 19,
    waterQuality: 'SAFE',
    mandalCount: 11,
    activeOutbreak: 'None Reported',
  },
  {
    id: 'JGD',
    name: 'Jogulamba Gadwal',
    hq: 'Gadwal',
    level: 'HIGH',
    cases: 92,
    waterQuality: 'POOR (River Tungabhadra Silt)',
    mandalCount: 12,
    activeOutbreak: 'Diarrhea Cluster',
  },
  {
    id: 'WNP',
    name: 'Wanaparthy',
    hq: 'Wanaparthy',
    level: 'MEDIUM',
    cases: 46,
    waterQuality: 'SAFE',
    mandalCount: 14,
    activeOutbreak: 'None Reported',
  },
  {
    id: 'NGK',
    name: 'Nagarkurnool',
    hq: 'Nagarkurnool',
    level: 'HIGH',
    cases: 88,
    waterQuality: 'MODERATE',
    mandalCount: 20,
    activeOutbreak: 'Gastroenteritis',
  },
  {
    id: 'MDK',
    name: 'Medak',
    hq: 'Medak',
    level: 'MEDIUM',
    cases: 49,
    waterQuality: 'SAFE',
    mandalCount: 21,
    activeOutbreak: 'None Reported',
  },
];

type DistrictFeature = Feature<Geometry, {
  DISTRICT?: string;
  Dist_LGD?: number | string;
  [key: string]: unknown;
}>;

type DistrictGeoJSON = FeatureCollection<
  Geometry,
  {
    DISTRICT?: string;
    Dist_LGD?: number | string;
    [key: string]: unknown;
  }
>;

const normalizeName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/district/g, '')
    .trim()
    .replace('kumuram bheem asifabad', 'kumuram bheem')
    .replace('medchal malkajgiri', 'medchal-malkajgiri')
    .replace('medchal-malkajgiri', 'medchal-malkajgiri')
    .replace('mahbubnagar', 'mahabubnagar');
};

const getLevelColor = (level: string): string => {
  switch (level) {
    case 'CRITICAL':
      return '#ef4444';
    case 'HIGH':
      return '#f97316';
    case 'MEDIUM':
      return '#eab308';
    case 'LOW':
      return '#22c55e';
    default:
      return '#94a3b8';
  }
};

/*
 * Automatically fits the Leaflet map to Telangana.
 */
const FitTelanganaBounds: React.FC<{
  data: DistrictGeoJSON | null;
}> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (!data || !data.features.length) return;

    const geoJsonLayer = window.L.geoJSON(data as any);
    const bounds = geoJsonLayer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [20, 20],
      });
    }
  }, [data, map]);

  return null;
};

export const TelanganaRiskMap: React.FC = () => {
  const [hovered, setHovered] =
    useState<DistrictRiskData | null>(null);

  const [selected, setSelected] =
    useState<DistrictRiskData | null>(null);

  const [search, setSearch] = useState('');

  const [levelFilter, setLevelFilter] =
    useState<string>('ALL');

  const [geoData, setGeoData] =
    useState<DistrictGeoJSON | null>(null);

  const [geoError, setGeoError] =
    useState<string | null>(null);

  /*
   * Load the 33-district GeoJSON.
   */
  useEffect(() => {
    fetch('/data/telangana-districts.geojson')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `GeoJSON request failed: ${response.status}`
          );
        }

        return response.json();
      })
      .then((data: DistrictGeoJSON) => {
        setGeoData(data);
      })
      .catch((error) => {
        console.error('Failed to load Telangana GeoJSON:', error);
        setGeoError('Unable to load Telangana district map.');
      });
  }, []);

  const filteredDistricts = useMemo(() => {
    return TELANGANA_DISTRICTS_DATA.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.hq.toLowerCase().includes(search.toLowerCase());

      const matchesLevel =
        levelFilter === 'ALL' ||
        d.level === levelFilter;

      return matchesSearch && matchesLevel;
    });
  }, [search, levelFilter]);

  /*
   * Find your existing health-risk record from
   * the GeoJSON district name.
   */
  const findDistrict = (
    geoDistrictName: string
  ): DistrictRiskData | undefined => {
    const normalizedGeo = normalizeName(geoDistrictName);

    return TELANGANA_DISTRICTS_DATA.find((district) => {
      const normalizedApp =
        normalizeName(district.name);

      return (
        normalizedGeo === normalizedApp ||
        normalizedGeo.includes(normalizedApp) ||
        normalizedApp.includes(normalizedGeo)
      );
    });
  };

  /*
   * District polygon styling.
   */
  const districtStyle = (feature?: DistrictFeature) => {
    const geoName =
      feature?.properties?.DISTRICT || '';

    const district =
      findDistrict(geoName);

    if (!district) {
      return {
        fillColor: '#64748b',
        fillOpacity: 0.45,
        color: '#0f172a',
        weight: 1,
      };
    }

    const isFiltered =
      filteredDistricts.some(
        (d) => d.id === district.id
      );

    const isSelected =
      selected?.id === district.id;

    return {
      fillColor: getLevelColor(district.level),
      fillOpacity: isFiltered
        ? isSelected
          ? 0.95
          : 0.72
        : 0.18,
      color: isSelected
        ? '#ffffff'
        : '#0f172a',
      weight: isSelected ? 3 : 1.2,
    };
  };

  /*
   * Leaflet events for each district.
   */
  const onEachDistrict = (
    feature: DistrictFeature,
    layer: any
  ) => {
    const geoName =
      feature.properties?.DISTRICT || '';

    const district =
      findDistrict(geoName);

    if (!district) {
      layer.bindTooltip(geoName);
      return;
    }

    layer.bindTooltip(
      `<strong>${district.name}</strong><br/>Risk: ${district.level}<br/>Cases: ${district.cases}`,
      {
        sticky: true,
      }
    );

    layer.on({
      mouseover: () => {
        setHovered(district);

        layer.setStyle({
          weight: 3,
          color: '#ffffff',
          fillOpacity: 0.95,
        });

        layer.bringToFront();
      },

      mouseout: () => {
        setHovered(null);

        layer.setStyle(
          districtStyle(feature)
        );
      },

      click: () => {
        setSelected(district);
      },
    });
  };

  return (
    <div className="w-full bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-2xl space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">

        <div>
          <div className="flex items-center gap-2 text-sky-400 text-xs font-black uppercase tracking-widest">
            <MapPin className="h-4 w-4" />
            State Public-Health Surveillance
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Telangana 33 Districts Health Risk Map
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Actual geographical district boundaries
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">

          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search district / HQ..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-1.5 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none"
            />
          </div>

          <select
            value={levelFilter}
            onChange={(e) =>
              setLevelFilter(e.target.value)
            }
            className="rounded-xl border border-slate-700 bg-slate-800/80 py-1.5 px-3 text-xs font-bold text-white focus:border-sky-500 focus:outline-none"
          >
            <option value="ALL">
              All 33 Districts
            </option>

            <option value="CRITICAL">
              Critical Risk
            </option>

            <option value="HIGH">
              High Risk
            </option>

            <option value="MEDIUM">
              Medium Risk
            </option>

            <option value="LOW">
              Low Risk
            </option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Map */}
        <div className="lg:col-span-8 relative bg-slate-950/80 rounded-2xl border border-slate-800/80 overflow-hidden">

          {/* Hover information */}
          {hovered && (
            <div className="absolute top-4 left-4 z-[1000] rounded-2xl bg-slate-900/95 p-3.5 text-xs shadow-2xl border border-slate-700 backdrop-blur-md space-y-1 pointer-events-none max-w-xs">

              <div className="flex items-center justify-between gap-3">

                <span className="font-extrabold text-white text-sm">
                  {hovered.name}
                </span>

                <span
                  className="rounded px-2 py-0.5 text-[10px] font-black text-white uppercase"
                  style={{
                    backgroundColor:
                      getLevelColor(hovered.level),
                  }}
                >
                  {hovered.level}
                </span>

              </div>

              <p className="text-slate-300 text-[11px]">
                Active Cases:{' '}
                <strong className="text-white">
                  {hovered.cases}
                </strong>
              </p>

              <p className="text-slate-300 text-[11px]">
                Water Status:{' '}
                <strong className="text-amber-400">
                  {hovered.waterQuality}
                </strong>
              </p>

              <p className="text-sky-300 text-[10px] font-semibold italic">
                Outbreak: {hovered.activeOutbreak}
              </p>
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-[1000] bg-slate-900/95 border border-slate-700 rounded-xl p-3 shadow-xl">

            <p className="text-[10px] font-black text-white uppercase mb-2">
              Risk Level
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">

              {[
                ['CRITICAL', '#ef4444'],
                ['HIGH', '#f97316'],
                ['MEDIUM', '#eab308'],
                ['LOW', '#22c55e'],
              ].map(([level, color]) => (
                <div
                  key={level}
                  className="flex items-center gap-1.5"
                >
                  <span
                    className="h-3 w-3 rounded-sm"
                    style={{
                      backgroundColor: color,
                    }}
                  />

                  <span className="text-[9px] text-slate-300 font-bold">
                    {level}
                  </span>
                </div>
              ))}

            </div>
          </div>

          {/* Map */}
          {geoError ? (
            <div className="h-[520px] flex items-center justify-center text-red-400 text-sm">
              {geoError}
            </div>
          ) : !geoData ? (
            <div className="h-[520px] flex items-center justify-center text-slate-400 text-sm">
              Loading Telangana district boundaries...
            </div>
          ) : (
            <MapContainer
              center={[17.9, 79.2]}
              zoom={7}
              scrollWheelZoom={true}
              className="h-[520px] w-full"
              style={{
                background: '#020617',
              }}
            >

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <GeoJSON
                key={`${levelFilter}-${search}-${selected?.id || 'none'}`}
                data={geoData}
                style={districtStyle as any}
                onEachFeature={onEachDistrict}
              />

              <FitTelanganaBounds
                data={geoData}
              />

            </MapContainer>
          )}

        </div>

        {/* Details Panel */}
        <div className="lg:col-span-4 space-y-4">

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">

            <div className="flex items-center justify-between border-b border-slate-800 pb-3">

              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                {selected
                  ? `${selected.name} District`
                  : 'Select District'}
              </h3>

              {selected && (
                <span
                  className="rounded px-2.5 py-1 text-[10px] font-black text-white uppercase"
                  style={{
                    backgroundColor:
                      getLevelColor(selected.level),
                  }}
                >
                  {selected.level}
                </span>
              )}

            </div>

            {selected ? (
              <div className="space-y-3 text-xs">

                <div className="rounded-xl bg-slate-900 p-3 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400 font-semibold">
                    Headquarters:
                  </span>

                  <span className="font-bold text-white">
                    {selected.hq}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-900 p-3 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400 font-semibold">
                    Active Health Cases:
                  </span>

                  <span className="text-lg font-black text-white">
                    {selected.cases}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-900 p-3 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-semibold block">
                    Water Quality Surveillance:
                  </span>

                  <span className="font-bold text-amber-300 block">
                    {selected.waterQuality}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-900 p-3 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-semibold block">
                    Active Disease Threat:
                  </span>

                  <span className="font-bold text-rose-400 block">
                    {selected.activeOutbreak}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-900 p-3 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400 font-semibold">
                    Mandals Covered:
                  </span>

                  <span className="font-bold text-sky-300">
                    {selected.mandalCount} Mandals
                  </span>
                </div>

              </div>
            ) : (
              <div className="py-6 text-center text-slate-500 text-xs space-y-2">

                <Info className="h-8 w-8 mx-auto text-slate-600" />

                <p>
                  Click any district on the map to inspect
                  health-risk information.
                </p>

              </div>
            )}

            {/* Quick Select */}
            <div className="border-t border-slate-800 pt-3">

              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Quick Select District:
              </span>

              <div className="max-h-36 overflow-y-auto pr-1 grid grid-cols-2 gap-1.5 text-[11px]">

                {filteredDistricts.map((district) => (
                  <button
                    key={district.id}
                    onClick={() =>
                      setSelected(district)
                    }
                    className={`px-2 py-1 rounded text-left truncate font-bold transition-all border ${
                      selected?.id === district.id
                        ? 'bg-sky-600 text-white border-sky-400'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
                    }`}
                  >
                    {district.name}
                  </button>
                ))}

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};