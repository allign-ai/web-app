import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {useOrganizationList} from "@clerk/clerk-react";

export default function OrgChooser() {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  if (!isLoaded) {
    return <>Loading</>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          Choose organisation
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <ul
              role="list"
              className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
            >
              {userMemberships.data?.map((mem) => (
                <li key={mem.id}
                    className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                  <div className="flex min-w-0 gap-x-4">
                    <img alt="" src={mem.organization.imageUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50"/>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        <a href={mem.id}>
                          <span className="absolute inset-x-0 -top-px bottom-0"/>
                          {mem.organization.name}
                        </a>
                      </p>
                      <p className="mt-1 flex text-xs leading-5 text-gray-500">
                        <a href={`mailto:${mem.organization.name}`} className="relative truncate hover:underline">
                          {mem.organization.name}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-x-4">
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">{mem.role}</p>
                      {mem.updatedAt ? (
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Last seen <time dateTime={mem.updatedAt.toDateString()}>{mem.updatedAt.toDateString()}</time>
                        </p>
                      ) : (
                        <div className="mt-1 flex items-center gap-x-1.5">
                          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>
                          </div>
                          <p className="text-xs leading-5 text-gray-500">Online</p>
                        </div>
                      )}
                    </div>
                    <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400"/>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
