using System;
using System.Diagnostics;
using Microsoft.Extensions.Logging;

namespace angular_portfolio.Services{
    public interface IPerformanceService{
        int getCpuUsage();
        int getMemoryUsage();
    }
    public class WinPerformanceService: IPerformanceService{
        private ILogger _logger { get; set; }

        public WinPerformanceService(
            ILogger<WinPerformanceService> logger
        ){
            _logger = logger;
        }
        public int getCpuUsage(){
            var proc = _runProcess("/C wmic cpu get loadpercentage");
            proc.WaitForExit();
            var output = proc.StandardOutput.ReadToEnd();
            try{
                var lines = output.Split("\r\r\n");
                var usage = lines[1];
                return Convert.ToInt32(usage);
            }catch(Exception){
                return -1;
            }
            
        }
        public int getMemoryUsage(){
            var proc = _runProcess("/C wmic OS get FreePhysicalMemory /Value");
            proc.WaitForExit();
            var procTotal = _runProcess("/C wmic ComputerSystem get TotalPhysicalMemory");
            procTotal.WaitForExit();
            var output = proc.StandardOutput.ReadToEnd();
            var outputTotal = procTotal.StandardOutput.ReadToEnd();
            try{
                Console.WriteLine($"\"{outputTotal}\"");
                var totalMemory = Convert.ToInt64(
                    outputTotal.Split("\r\r\n")[1].Trim()
                );

                Console.WriteLine($"\"{totalMemory}\"");
                var freeMemory = Convert.ToInt64(
                    output.Split("\r\r\n")[2]
                    .Split('=')[1]
                );

                _logger.LogTrace("Total Memory: {0}, Free Memory: {1}", totalMemory, freeMemory);

                totalMemory = totalMemory/1024;
                var usage = ((double)totalMemory - freeMemory) / (totalMemory + 0.0);
                return  (int)Math.Round(usage * 100);
            }catch(Exception){
                return -1;
            }
        }

        private Process _runProcess(string arguments){
            return Process.Start(new ProcessStartInfo(){
                WindowStyle = ProcessWindowStyle.Hidden,
                FileName = "cmd.exe",
                RedirectStandardOutput = true,
                Arguments = arguments
            });
        }
    }
}