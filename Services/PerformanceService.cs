using System;
using System.Diagnostics;

namespace angular_portfolio.Services{
    public interface IPerformanceService{
        int getCpuUsage();
    }
    public class WinPerformanceService: IPerformanceService{
        public int getCpuUsage(){
            var proc = Process.Start(new ProcessStartInfo(){
                WindowStyle = ProcessWindowStyle.Hidden,
                FileName = "cmd.exe",
                RedirectStandardOutput = true,
                Arguments = "/C wmic cpu get loadpercentage"
            });
            proc.WaitForExit();
            var meh = proc.StandardOutput.ReadToEnd();
            try{
                var lines = meh.Split("\r\r\n");
                var usage = lines[1];
                return Convert.ToInt32(usage);
            }catch(Exception ex){
                return -1;
            }
            
        }
    }
}