import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationItem() {
  return (
    <Stack
      spacing={2}
      alignItems={"center"}
      height={"100px"}
      justifyContent={"center"}
    >
      <Pagination count={2} color="secondary" size="large" shape="rounded" />
    </Stack>
  );
}
