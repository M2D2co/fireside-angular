//  /projects
"$projectId": {
  ".write": "auth !== null && (root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() || (newData.exists() && !data.exists())) && (root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-owner' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-admin' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-admin')",
  ".read": "auth !== null && root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() && (root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-owner' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-admin' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-admin')",
}


//  Read
auth !== null && root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() && (root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-owner' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-admin' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-admin')

auth !== null && 
      root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() 
  && (
      root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-owner' 
   || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-admin'
   || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-admin'
   )

//  Write
auth !== null && (root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() || (newData.exists() && !data.exists())) && (root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-owner' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-admin' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-admin')

auth !== null && (
        root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists()
        || (newData.exists() && !data.exists())
      )
  && (
      root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-owner' 
   || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-admin'
   || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-admin'
   )


//  /projects/sections && projects/info
".read": "auth !== null && root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() && (root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-read' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-write' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-read' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-write' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-share')",
".write": "auth !== null && (root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() || (newData.exists() && !data.exists()) && (root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-write' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-write'))"


auth !== null && root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() && (root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-read' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-write' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-read' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-write' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-share')
//  Read
auth !== null && root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() &&
    (
        root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-read' 
     || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-write'
     || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-read'
     || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-write'
     || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-share'
  )

//  Write

auth !== null && (root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() || (newData.exists() && !data.exists()) && (root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-write' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-write'))

auth !== null && 
  (
    root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() 
    || (newData.exists() && !data.exists()
  ) && ( 
    root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-write'
    || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-write'
  )
)



//  /projects/users
".read": "auth !== null && root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() && root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-share'",
".write": "auth !== null && root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() && root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-share'"



//  Read
auth !== null && root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() && root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-share'

//  Write

auth !== null && root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() && root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-share'



//  /sections && /colors && /typography

"colors": {
  "$projectId": {
    ".read": "auth !== null && root.child('clients').child( root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() && (root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-owner' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-admin' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-write' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-read' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-write' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-read' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-admin' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-share')",
    ".write": "auth !== null && (root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() || (newData.exists() && !data.exists())) && (root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-owner' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-admin' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-write' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-admin' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-write')"
  }
},

//  Read
auth !== null && root.child('clients').child( root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() && (root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-owner' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-admin' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-write' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-read' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-write' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-read' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-admin' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-share')

auth !== null && 
root.child('clients').child( root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() 
&& (
     root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-owner' 
  || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-admin'
  || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-write'
  || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-read'
  || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-write' 
  || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-read'
  || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-admin'
  || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-share'
)

//  Write
auth !== null && (root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() || (newData.exists() && !data.exists())) && (root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-owner' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-admin' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-write' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-admin' || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-write')

auth !== null && 
  (
       root.child('clients').child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).exists() 
    || (newData.exists() && !data.exists())
  )
  && (
       root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-owner' 
    || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-admin' 
    || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('access').val() === 'client-write'
    || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-admin'
    || root.child('acl').child(auth.uid).child(root.child('users').child(auth.uid).child('activeClient').val()).child('projects').child($projectId).child('access').val() === 'project-write'
  )