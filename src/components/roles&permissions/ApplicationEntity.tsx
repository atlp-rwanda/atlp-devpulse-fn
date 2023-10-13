import * as IoIcons from 'react-icons/io5';

function ApplicationEntity({
  appSelectedEntity,
  setAppSelectedEntity,
  setAppOpen,
  appEntities,
  appOpen,
  setAppPermissions,
  className,
}) {
  return (
    <div className={`${className}`}>
      <select
        name='entity'
        id='entity'
        value={appSelectedEntity}
        onChange={(e) => {
          setAppSelectedEntity(e.target.value);
          setAppOpen(true);
        }}
        className='dark:bg-dark-tertiary border dark:text-white border-primary py-2 rounded outline-none px-5 font-sans text-xs w-4/5 pt-4 ml-20 md:ml-4'
      >
        <option className='' value=''>
          -- Please choose an Entity --
        </option>
        {appEntities?.map((entity: string) => (
          <option className='dark:text-white' key={entity} value={entity}>
            {entity}
          </option>
        ))}
      </select>
      {appOpen && (
        <div className='mt-2 dark:bg-dark-tertiary dark:text-white p-5 relative m-auto w-[80%] ml-20 md:ml-4 '>
          {/* <IoIcons.IoClose
            onClick={() => setOpenP(false)}
            className='cursor-pointer dark:text-white top-[10px] text-[25px] flex justify-end absolute right-0'
          /> */}
          <div className='grid grid-cols-5 md:grid-cols-2'>
            <div className='p-1 dark:text-white text-[13px] flex gap-2'>
              <input
                type='checkbox'
                className=''
                value='create'
                onChange={(e) =>
                  setAppPermissions((currentState) => [
                    ...currentState,
                    e.target.value,
                  ])
                }
              />
              <span>create</span>
            </div>
            <div>
              <div className='mr-3 p-1 dark:text-white text-[13px] flex items-center gap-2'>
                <input
                  type='checkbox'
                  value='viewOne'
                  onChange={(e) =>
                    setAppPermissions((currentState) => [
                      ...currentState,
                      e.target.value,
                    ])
                  }
                />
                <span>viewOne</span>
              </div>
            </div>
            <div>
              <div className='mr-3 p-1 dark:text-white text-[13px] flex items-center gap-2'>
                <input
                  type='checkbox'
                  value='viewOwn'
                  onChange={(e) =>
                    setAppPermissions((currentState) => [
                      ...currentState,
                      e.target.value,
                    ])
                  }
                />
                <span>viewOwn</span>
              </div>
            </div>
            <div>
              <div className='mr-3 p-1 dark:text-white text-[13px] flex items-center gap-2'>
                <input
                  type='checkbox'
                  value='viewMultiple'
                  onChange={(e) =>
                    setAppPermissions((currentState) => [
                      ...currentState,
                      e.target.value,
                    ])
                  }
                />
                <span>viewMultiple</span>
              </div>
            </div>
            <div>
              <div className='mr-3 p-1 dark:text-white text-[13px] flex items-center gap-2'>
                <input
                  type='checkbox'
                  value='updateOne'
                  onChange={(e) =>
                    setAppPermissions((currentState) => [
                      ...currentState,
                      e.target.value,
                    ])
                  }
                />
                <span>updateOne</span>
              </div>
            </div>
            <div>
              <div className='mr-3 p-1 dark:text-white text-[13px] flex items-center gap-2'>
                <input
                  type='checkbox'
                  value='updateOwn'
                  onChange={(e) =>
                    setAppPermissions((currentState) => [
                      ...currentState,
                      e.target.value,
                    ])
                  }
                />
                <span>updateOwn</span>
              </div>
            </div>
            <div>
              <div className='mr-3 p-1 dark:text-white text-[13px] flex items-center gap-2'>
                <input
                  type='checkbox'
                  value='updateMultiple'
                  onChange={(e) =>
                    setAppPermissions((currentState) => [
                      ...currentState,
                      e.target.value,
                    ])
                  }
                />
                <span>updateMultiple</span>
              </div>
            </div>
            <div>
              <div className='mr-3 p-1 dark:text-white text-[13px] flex items-center gap-2'>
                <input
                  type='checkbox'
                  value='deleteOne'
                  onChange={(e) =>
                    setAppPermissions((currentState) => [
                      ...currentState,
                      e.target.value,
                    ])
                  }
                />
                <span>deleteOne</span>
              </div>
            </div>
            <div>
              <div className='mr-3 p-1 dark:text-white text-[13px] flex items-center gap-2'>
                <input
                  type='checkbox'
                  value='deleteOwn'
                  onChange={(e) =>
                    setAppPermissions((currentState) => [
                      ...currentState,
                      e.target.value,
                    ])
                  }
                />
                <span>deleteOwn</span>
              </div>
            </div>
            <div>
              <div className='mr-3 p-1 dark:text-white text-[13px] flex items-center gap-2'>
                <input
                  type='checkbox'
                  value='deleteMultiple'
                  onChange={(e) =>
                    setAppPermissions((currentState) => [
                      ...currentState,
                      e.target.value,
                    ])
                  }
                />
                <span>deleteMultiple</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationEntity;
