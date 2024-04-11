import {UndefinedInitialDataOptions, useQuery} from '@tanstack/react-query';
import {fetchJurisdictions, fetchSubJurisdictions} from './fakeJurisdictionApi';
import {Jurisdiction, jurisdictionSchema} from './schemas';

export const getJurisdictions = async () => {
  try {
    const rawData = await fetchJurisdictions();
    const data = jurisdictionSchema.array().parse(rawData);
    return data;
  } catch (e) {
    console.error('Error fetching root jurisdictions', e);
    throw e;
  }
};

export const JURISDICTIONS_QUERY_KEY = 'jurisdictions';
export const useJurisdictionsQuery = (options?: Partial<UndefinedInitialDataOptions<Jurisdiction[]>>) =>
  useQuery({
    ...options,
    queryKey: [JURISDICTIONS_QUERY_KEY],
    queryFn: getJurisdictions,
  });

export const getSubJurisdictions = async (id: Jurisdiction['id']) => {
  try {
    const rawData = await fetchSubJurisdictions(id);
    const data = jurisdictionSchema.array().parse(rawData);
    return data;
  } catch (e) {
    console.error('Error fetching subjurisdictions from id', id, e);
    throw e;
  }
};

export const SUB_JURISDICTIONS_QUERY_KEY = 'subJurisdictions';
export const useSubJurisdictionsQuery = (
  id: Jurisdiction['id'],
  options?: Partial<UndefinedInitialDataOptions<Jurisdiction[]>>
) =>
  useQuery({
    ...options,
    queryKey: [SUB_JURISDICTIONS_QUERY_KEY, id],
    queryFn: () => getSubJurisdictions(id),
  });
