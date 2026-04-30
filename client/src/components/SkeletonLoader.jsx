import React from 'react'
import { Box, Skeleton, Grid, TableRow, TableCell } from '@mui/material'

export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <TableRow key={i}>
          {[...Array(columns)].map((_, j) => (
            <TableCell key={j}>
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '80%' }} />
              {j === 0 && <Skeleton variant="text" sx={{ fontSize: '0.8rem', width: '40%' }} />}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export const CardSkeleton = ({ count = 3 }) => {
  return (
    <Grid container spacing={3}>
      {[...Array(count)].map((_, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 1, mb: 2 }} />
            <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '60%', mb: 1 }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '80%', mb: 2 }} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="text" width={100} />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

const SkeletonLoader = ({ type = 'table', rows, columns, count }) => {
  if (type === 'table') return <TableSkeleton rows={rows} columns={columns} />
  if (type === 'card') return <CardSkeleton count={count} />
  return <Skeleton variant="rectangular" width="100%" height={200} />
}

export default SkeletonLoader
