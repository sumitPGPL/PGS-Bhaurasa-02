import injectToken from "@/app/actions";
import Dashboard from "@/components/Dashboard/AdminDashboard";
import { getAllAdmissions } from "@/lib/services/admission";
import { getAllNews } from "@/lib/services/news";
import { getUsers } from "@/lib/services/user/userServices";
import { getEvent } from "@/lib/services/events/eventSevices";

async function AdminDashboard(props) {
  const isFailed = await injectToken();
  const clientProps = {};
  clientProps.isFailed = isFailed;
  if (!isFailed) {
    clientProps.users = await getUsers({ limit: 5, page: 1 });
    clientProps.admissions = await getAllAdmissions();
    clientProps.news = await getAllNews();
    clientProps.events = await getEvent({limit:5,page:1})
    clientProps.isFailed = false;
  }

  return (
    <>
      <Dashboard clientProps={clientProps} />
    </>
  );
}

export default AdminDashboard;
