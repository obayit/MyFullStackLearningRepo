using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using angular_portfolio.Services;

namespace angular_portfolio.Controllers
{
    [Route("api/[controller]")]
    public class ResourcesController : Controller
    {
        private IPerformanceService _performanceService { get; set; }
        public ResourcesController(IPerformanceService performanceService){
            _performanceService = performanceService;
        }
        [HttpGet("[action]")]
        public int cpuUsage()
        {
            return _performanceService.getCpuUsage();
        }
        [HttpGet("[action]")]
        public double memoryUsage()
        {
            return _performanceService.getMemoryUsage();
        }
    }
}
