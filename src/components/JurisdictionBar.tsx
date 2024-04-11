import classNames from 'classnames';
import {useSubJurisdictionsQuery} from 'content/hooks';
import {Jurisdiction} from 'content/schemas';
import {ComponentProps, useCallback} from 'react';
import {Spinner} from './Icons';
import ErrorBox from './ErrorBox';

type Props = Omit<ComponentProps<'div'>, 'onChange'> & {
  selectedIds: Jurisdiction['id'][];
  jurisdiction: Jurisdiction;
  onChange: (id: Jurisdiction['id'], selected: boolean) => void;
};

const JurisdictionBar = ({className, selectedIds, jurisdiction, onChange, ...props}: Props) => {
  const selected = selectedIds.includes(jurisdiction.id);
  const subJurisdictionsQuery = useSubJurisdictionsQuery(jurisdiction.id, {enabled: selected});

  const handleCheckChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    e => onChange(jurisdiction.id, e.target.checked),
    [jurisdiction.id, onChange]
  );

  return (
    <div className={classNames('flex w-full flex-col', className)} {...props}>
      <div className={classNames('flex flex-row items-center justify-between')}>
        <div className="flex flex-row px-3 py-2 gap-x-2">
          <input type="checkbox" checked={selected} onChange={handleCheckChange} />
          <div>{jurisdiction.name}</div>
        </div>
        {subJurisdictionsQuery.isLoading && <Spinner />}
      </div>
      {selected && subJurisdictionsQuery.isSuccess && subJurisdictionsQuery.data.length > 0 && (
        <div className="flex flex-row w-full">
          <div className="w-0.5 ms-[1.1rem] rounded-full bg-slate-300" />
          <div className="w-full pe-4">
            {subJurisdictionsQuery.data.map(jurisdiction => (
              <div className="relative" key={`jurisdiction-${jurisdiction.id}`}>
                <div className="absolute top-5 w-2 h-0.5 bg-slate-300" />
                <JurisdictionBar
                  className="ms-2"
                  jurisdiction={jurisdiction}
                  selectedIds={selectedIds}
                  onChange={onChange}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {selected && subJurisdictionsQuery.isError && <ErrorBox className="ms-4">Error loading data</ErrorBox>}
    </div>
  );
};

export default JurisdictionBar;
