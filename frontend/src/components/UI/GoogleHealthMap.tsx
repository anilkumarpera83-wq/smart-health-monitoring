import React, { useEffect, useRef, useState } from 'react';
import { mapService, MapLocation } from '../../services/mapService';
import { MapPin, Search, Filter, RefreshCw, AlertTriangle, Activity, Droplet, ShieldAlert, CheckCircle, Info, Layers } from 'lucide-react';

interface GoogleHealthMapProps {
  initialDistrictId?: number;
  height?: string;
  className?: string;
}

export const GoogleHealthMap: React.FC<GoogleHealthMapProps> = ({
  initialDistrictId,
  height = '580px',
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapObj = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState<boolean>(false);
  const [apiKeyMissing, setApiKeyMissing] = useState<boolean>(false);

  // Filters
  const [search, setSearch] = useState<string>('');
  const [districtFilter, setDistrictFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // 1. Fetch map markers from backend REST API
  const fetchLocations = async () => {
    setLoading(true);
    try {
      const dId = districtFilter !== 'ALL' ? parseInt(districtFilter) : (initialDistrictId || undefined);
      const data = await mapService.getMapLocations({
        districtId: dId,
        type: typeFilter !== 'ALL' ? typeFilter : undefined,
        status: statusFilter !== 'ALL' ? statusFilter : undefined,
        search: search || undefined
      });
      setLocations(data);
    } catch (err) {
      console.error('Failed to load map locations from API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [districtFilter, typeFilter, statusFilter, search]);

  // 2. Load Google Maps JavaScript API dynamically using env variable
  useEffect(() => {
    if (window.google && window.google.maps) {
      setGoogleMapsLoaded(true);
      return;
    }

    if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
      setApiKeyMissing(true);
      return;
    }

    const scriptId = 'google-maps-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = () => setGoogleMapsLoaded(true);
      script.onerror = () => setApiKeyMissing(true);
      document.head.appendChild(script);
    }
  }, [apiKey]);

  // 3. Initialize Google Map Canvas when JS API is ready
  useEffect(() => {
    if (googleMapsLoaded && mapRef.current && !googleMapObj.current && window.google) {
      googleMapObj.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 17.8748, lng: 79.0088 }, // Telangana Center
        zoom: 8,
        mapTypeId: 'roadmap',
        styles: [
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#cbe6ff' }] },
          { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f8fafc' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
          { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#475569' }] }
        ],
        zoomControl: true,
        streetViewControl: false,
        fullscreenControl: true
      });
    }
  }, [googleMapsLoaded]);

  // 4. Update Google Maps Markers when locations change
  useEffect(() => {
    if (googleMapObj.current && window.google && googleMapsLoaded) {
      // Clear existing markers
      markersRef.current.forEach(m => m.setMap(null));
      markersRef.current = [];

      const bounds = new window.google.maps.LatLngBounds();

      locations.forEach(loc => {
        const position = { lat: loc.latitude, lng: loc.longitude };
        bounds.extend(position);

        // Marker color by Status Indicator (Normal, Warning, High Risk)
        const markerColor = loc.status === 'HIGH_RISK' ? '#ef4444' : loc.status === 'WARNING' ? '#f97316' : '#22c55e';

        const svgMarker = {
          path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
          fillColor: markerColor,
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff',
          scale: 1.8,
          anchor: new window.google.maps.Point(12, 22)
        };

        const marker = new window.google.maps.Marker({
          position,
          map: googleMapObj.current,
          title: loc.name,
          icon: svgMarker,
          animation: loc.status === 'HIGH_RISK' ? window.google.maps.Animation.BOUNCE : null
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 240px; font-family: sans-serif;">
              <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 4px;">${loc.name}</div>
              <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 6px;">
                <span style="background: ${markerColor}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 800; text-transform: uppercase;">
                  ${loc.status.replace('_', ' ')}
                </span>
                <span style="font-size: 11px; color: #64748b; font-weight: 600;">${loc.type.replace('_', ' ')}</span>
              </div>
              <div style="font-size: 11px; color: #334155; line-height: 1.5;">
                <div>📍 <b>District:</b> ${loc.districtName}</div>
                <div>🏛️ <b>Mandal/Village:</b> ${loc.mandalName} / ${loc.villageName}</div>
                <div>🤒 <b>Active Cases:</b> ${loc.activeCases}</div>
                <div>💧 <b>Water Status:</b> ${loc.waterQualityStatus}</div>
              </div>
            </div>
          `
        });

        marker.addListener('click', () => {
          setSelectedLocation(loc);
          infoWindow.open(googleMapObj.current, marker);
        });

        markersRef.current.push(marker);
      });

      if (locations.length > 0) {
        googleMapObj.current.fitBounds(bounds);
        if (locations.length === 1) {
          googleMapObj.current.setZoom(12);
        }
      }
    }
  }, [locations, googleMapsLoaded]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'HIGH_RISK':
        return <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-600 text-white uppercase flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> HIGH RISK</span>;
      case 'WARNING':
        return <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-white uppercase flex items-center gap-1"><Activity className="h-3 w-3" /> WARNING</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-600 text-white uppercase flex items-center gap-1"><CheckCircle className="h-3 w-3" /> NORMAL</span>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'HEALTH_CENTER': return <Activity className="h-4 w-4 text-blue-400" />;
      case 'WATER_TESTING': return <Droplet className="h-4 w-4 text-cyan-400" />;
      case 'DISEASE_RISK': return <ShieldAlert className="h-4 w-4 text-rose-400" />;
      default: return <MapPin className="h-4 w-4 text-emerald-400" />;
    }
  };

  return (
    <div className={`w-full bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-white flex flex-col ${className}`}>
      {/* 1. FILTER & SEARCH CONTROL BAR */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 space-y-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/mission_bhagiratha_logo.png" alt="Mission Bhagiratha" className="h-10 w-auto object-contain bg-white rounded-lg p-0.5 shadow-sm border border-slate-700" title="Mission Bhagiratha - Safe & Clean Drinking Water To Every Household" />
            <div>
              <div className="flex items-center gap-2 text-sky-400 text-xs font-black uppercase tracking-wider">
                <MapPin className="h-4 w-4 text-emerald-400" /> Live Google Maps Health & Mission Bhagiratha Water Surveillance
              </div>
              <h3 className="text-lg font-black text-white">Telangana Health & Drinking Water Monitoring Map</h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-44">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search location / village..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800/90 py-1.5 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none"
              />
            </div>

            {/* District Selector */}
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-800/90 py-1.5 px-3 text-xs font-bold text-white focus:border-sky-500 focus:outline-none"
            >
              <option value="ALL">All Districts</option>
              <option value="1">Hyderabad</option>
              <option value="2">Siddipet</option>
              <option value="3">Warangal</option>
              <option value="4">Karimnagar</option>
              <option value="5">Nalgonda</option>
              <option value="6">Khammam</option>
              <option value="7">Nizamabad</option>
              <option value="8">Mancherial</option>
              <option value="9">Adilabad</option>
            </select>

            {/* Type Selector */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-800/90 py-1.5 px-3 text-xs font-bold text-white focus:border-sky-500 focus:outline-none"
            >
              <option value="ALL">All Marker Types</option>
              <option value="HEALTH_CENTER">Health Centers (PHCs)</option>
              <option value="WATER_TESTING">Water-Testing Stations</option>
              <option value="DISEASE_RISK">Disease Outbreak Hotspots</option>
              <option value="VILLAGE">Villages</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-800/90 py-1.5 px-3 text-xs font-bold text-white focus:border-sky-500 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="HIGH_RISK">🔴 High Risk</option>
              <option value="WARNING">🟡 Warning</option>
              <option value="NORMAL">🟢 Normal</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={fetchLocations}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
              title="Refresh API Data"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN MAP CANVAS DISPLAY */}
      <div className="relative w-full flex-1 min-h-[480px] bg-slate-950 flex items-center justify-center">
        {/* Google Maps Container */}
        <div ref={mapRef} style={{ width: '100%', height }} className="w-full h-full" />

        {/* Fallback Interactive Layer when Google Maps API Key is in Demo / Fallback Mode */}
        {(!googleMapsLoaded || apiKeyMissing) && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex flex-col justify-between z-10 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-black text-white uppercase tracking-wider">
                  Interactive Telangana Map (Demo API Key Mode Active)
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500" /> High Risk</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-orange-500" /> Warning</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-green-500" /> Normal</span>
              </div>
            </div>

            {/* Markers Grid Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4 overflow-y-auto max-h-[380px] pr-2">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedLocation?.id === loc.id
                      ? 'bg-slate-800 border-sky-400 shadow-lg scale-[1.02]'
                      : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(loc.type)}
                      <span className="font-extrabold text-xs text-white truncate">{loc.name}</span>
                    </div>
                    {getStatusBadge(loc.status)}
                  </div>

                  <div className="space-y-1 text-[11px] text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">District:</span>
                      <strong className="text-white">{loc.districtName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Latitude / Longitude:</span>
                      <span className="font-mono text-[10px] text-sky-300">{loc.latitude}, {loc.longitude}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Cases:</span>
                      <strong className="text-amber-400">{loc.activeCases}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Water Quality:</span>
                      <span className="truncate text-slate-200 font-semibold">{loc.waterQualityStatus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer API Info Note */}
            <div className="text-[10px] text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between">
              <span>* Set <code className="text-sky-300">VITE_GOOGLE_MAPS_API_KEY</code> in <code className="text-sky-300">.env</code> to load live Google Maps JavaScript tiles.</span>
              <span className="font-mono text-slate-500">{locations.length} Markers Loaded</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. SELECTED LOCATION DETAIL CARD OVERLAY */}
      {selectedLocation && (
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {getTypeIcon(selectedLocation.type)}
              <h4 className="text-sm font-black text-white">{selectedLocation.name}</h4>
              {getStatusBadge(selectedLocation.status)}
            </div>
            <p className="text-xs text-slate-300">{selectedLocation.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
              <span>📍 Coordinates: <strong className="text-sky-300 font-mono">{selectedLocation.latitude}, {selectedLocation.longitude}</strong></span>
              <span>🏛️ Mandal: <strong className="text-white">{selectedLocation.mandalName}</strong></span>
              <span>🏡 Village: <strong className="text-white">{selectedLocation.villageName}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Outbreak Risk Score</span>
              <span className="text-xl font-black text-amber-400">{selectedLocation.riskScore} <span className="text-xs text-slate-500">/ 100</span></span>
            </div>
            <button
              onClick={() => setSelectedLocation(null)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
