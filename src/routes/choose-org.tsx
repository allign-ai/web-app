import { useOrganizationList } from '@clerk/clerk-react'

export const CustomOrgSwitcher = () => {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  if (!isLoaded) {
    return <>Loading</>
  }

  console.log(userMemberships)

  return (
    <>
      <ul>
        {userMemberships.data?.map((mem) => (
          <li key={mem.id}>
            <span>{mem.organization.name}</span>
            <button onClick={() => setActive({organization: mem.organization.id})}>Select</button>
          </li>
        ))}
      </ul>

      <button disabled={!userMemberships.hasNextPage} onClick={() => userMemberships.fetchNext()}>
        Load more
      </button>
    </>
  )
}
