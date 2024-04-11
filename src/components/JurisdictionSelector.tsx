import {SUB_JURISDICTIONS_QUERY_KEY, getSubJurisdictions, useJurisdictionsQuery} from 'content/hooks';
import {Jurisdiction} from 'content/schemas';
import {ComponentProps, useCallback, useEffect, useState} from 'react';
import Box from './Box';
import JurisdictionBar from './JurisdictionBar';
import {useQueryClient} from '@tanstack/react-query';
import {Spinner} from './Icons';
import ErrorBox from './ErrorBox';

const JurisdictionSelector = (props: ComponentProps<'div'>) => {
  const queryClient = useQueryClient();
  const jurisdictionsQuery = useJurisdictionsQuery();
  const [selectedIds, setSelectedIds] = useState<Jurisdiction['id'][]>([]);

  const getSelectionsToBeRemoved = useCallback(
    async (id: Jurisdiction['id']) => {
      const currentSelections: Jurisdiction['id'][] = [id];
      try {
        const subJurisdictions = await queryClient.ensureQueryData({
          queryKey: [SUB_JURISDICTIONS_QUERY_KEY, id],
          queryFn: () => getSubJurisdictions(id),
        });
        for (const jurisdiction of subJurisdictions) {
          if (!selectedIds.includes(jurisdiction.id)) continue;
          const subSelections = await getSelectionsToBeRemoved(jurisdiction.id);
          currentSelections.push(...subSelections);
        }
      } catch (err) {
        console.error("Couldn't get sub jurisdictions for id", id, err);
      }
      return currentSelections;
    },
    [queryClient, selectedIds]
  );

  const handleCheckChange = useCallback(
    async (id: Jurisdiction['id'], selected: boolean) => {
      if (selected) setSelectedIds(ids => [...new Set(ids.concat(id))]);
      else {
        const selectionsToBeRemoved = await getSelectionsToBeRemoved(id);
        setSelectedIds(ids => ids.filter(i => !selectionsToBeRemoved.includes(i)));
      }
    },
    [getSelectionsToBeRemoved]
  );

  /** Intentional logging to reflect the current state */
  useEffect(() => {
    console.log({selectedIds});
  }, [selectedIds]);

  return (
    <Box {...props}>
      <div className="min-w-[40rem] max-h-[60rem] overflow-y-auto px-4 py-2">
        {jurisdictionsQuery.isSuccess &&
          (jurisdictionsQuery.data.length > 0 ? (
            jurisdictionsQuery.data.map(jurisdiction => (
              <JurisdictionBar
                key={`jurisdiction-${jurisdiction.id}`}
                jurisdiction={jurisdiction}
                selectedIds={selectedIds}
                onChange={handleCheckChange}
              />
            ))
          ) : (
            <div>No jurisdiction found</div>
          ))}
        {jurisdictionsQuery.isError && <ErrorBox>Error loading data</ErrorBox>}
        {jurisdictionsQuery.isLoading && (
          <div className="flex flex-row gap-x-4">
            <div>Loading...</div>
            <Spinner />
          </div>
        )}
      </div>
    </Box>
  );
};

export default JurisdictionSelector;
