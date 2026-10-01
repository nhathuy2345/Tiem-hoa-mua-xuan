using System.Web;
using System.Web.Mvc;

namespace Tiệm_Hoa_Mùa_Xuân
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
