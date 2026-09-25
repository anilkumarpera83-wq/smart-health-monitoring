import React, { useState, useEffect } from 'react';
import { locationService } from '../../services/locationService';
import { DistrictLocation, MandalLocation, VillageLocation } from '../../types';

interface LocationCascadeSelectProps {
  onLocationChange?: (location: {
    stateId: number;
    districtId: number;
    mandalId: number;
    villageId: number;
  }) => void;
  onLocationSelect?: (
    district: DistrictLocation | null,
    mandal: MandalLocation | null,
    village: VillageLocation | null
  ) => void;
  required?: boolean;
}

export const LocationCascadeSelect: React.FC<LocationCascadeSelectProps> = ({
  onLocationChange,
  onLocationSelect,
  required = true,
}) => {
  const [districts, setDistricts] = useState<DistrictLocation[]>([]);
  const [mandals, setMandals] = useState<MandalLocation[]>([]);
  const [villages, setVillages] = useState<VillageLocation[]>([]);

  const [selectedDistrictObj, setSelectedDistrictObj] = useState<DistrictLocation | null>(null);
  const [selectedMandalObj, setSelectedMandalObj] = useState<MandalLocation | null>(null);
  const [selectedVillageObj, setSelectedVillageObj] = useState<VillageLocation | null>(null);

  const [selectedDistrict, setSelectedDistrict] = useState<number | ''>('');
  const [selectedMandal, setSelectedMandal] = useState<number | ''>('');
  const [selectedVillage, setSelectedVillage] = useState<number | ''>('');

  useEffect(() => {
    // Load Telangana districts by default (stateId = 1)
    locationService.getDistricts(1).then(setDistricts).catch(console.error);
  }, []);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dId = Number(e.target.value);
    setSelectedDistrict(dId);
    setSelectedMandal('');
    setSelectedVillage('');
    setSelectedMandalObj(null);
    setSelectedVillageObj(null);
    setMandals([]);
    setVillages([]);

    const dObj = districts.find(d => d.id === dId) || null;
    setSelectedDistrictObj(dObj);

    if (onLocationSelect) {
      onLocationSelect(dObj, null, null);
    }

    if (dId) {
      locationService.getMandals(dId).then(setMandals).catch(console.error);
    }
  };

  const handleMandalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mId = Number(e.target.value);
    setSelectedMandal(mId);
    setSelectedVillage('');
    setSelectedVillageObj(null);
    setVillages([]);

    const mObj = mandals.find(m => m.id === mId) || null;
    setSelectedMandalObj(mObj);

    if (onLocationSelect) {
      onLocationSelect(selectedDistrictObj, mObj, null);
    }

    if (mId) {
      locationService.getVillages(mId).then(setVillages).catch(console.error);
    }
  };

  const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const vId = Number(e.target.value);
    setSelectedVillage(vId);

    const vObj = villages.find(v => v.id === vId) || null;
    setSelectedVillageObj(vObj);

    if (onLocationSelect) {
      onLocationSelect(selectedDistrictObj, selectedMandalObj, vObj);
    }

    if (selectedDistrict && selectedMandal && vId && onLocationChange) {
      onLocationChange({
        stateId: 1,
        districtId: Number(selectedDistrict),
        mandalId: Number(selectedMandal),
        villageId: vId,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">District *</label>
        <select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          required={required}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-health-blue-500 focus:ring-1 focus:ring-health-blue-500"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Mandal *</label>
        <select
          value={selectedMandal}
          onChange={handleMandalChange}
          disabled={!selectedDistrict}
          required={required}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-health-blue-500 focus:ring-1 focus:ring-health-blue-500 disabled:bg-slate-100"
        >
          <option value="">Select Mandal</option>
          {mandals.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Village *</label>
        <select
          value={selectedVillage}
          onChange={handleVillageChange}
          disabled={!selectedMandal}
          required={required}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-health-blue-500 focus:ring-1 focus:ring-health-blue-500 disabled:bg-slate-100"
        >
          <option value="">Select Village</option>
          {villages.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
