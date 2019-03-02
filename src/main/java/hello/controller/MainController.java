package hello;

import hello.Models.SortingProcess;
import hello.Models.Subject;
import hello.Models.User;
import hello.Repository.CreateTestRepository;
import hello.Repository.SortingProcessRepository;
import hello.Repository.SubjectRepository;
import hello.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Controller    // This means that this class is a Controller
@RequestMapping(path = "/demo") // This means URL's start with /demo (after Application path)
public class MainController {
    int[] array;
    String[] aufgabe;


    @Autowired // This means to get the bean called userRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private SortingProcessRepository sortingProcessRepository;

    @Autowired
    private CreateTestRepository createTestRepository;

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(SimpleMailMessage email) {
        mailSender.send(email);
    }


    // Process form submission from forgotPassword page
    @GetMapping(path = "/forgot")
    public @ResponseBody
    String processForgotPasswordForm(@RequestParam("email") String userEmail, HttpServletRequest request) {

        // Lookup user in database by e-mail
        Optional<User> optional = userRepository.findUserByEmail(userEmail);

        if (!optional.isPresent()) {
            return "We didn't find an account for that e-mail address.";
        } else {

            // Generate random 36-character string token for reset password
            User user = optional.get();
            user.setResetToken(UUID.randomUUID().toString());

            // Save token to database
            userRepository.save(user);

            String appUrl = request.getScheme() + "://" + request.getServerName() + ":8080/demo";

            // Email message
            SimpleMailMessage passwordResetEmail = new SimpleMailMessage();
            passwordResetEmail.setFrom("funtesticsup@gmail.com");
            passwordResetEmail.setTo(user.getEmail());
            passwordResetEmail.setSubject("Password Reset Request");
            passwordResetEmail.setText("To reset your password, click the link below:\n" + appUrl
                    + "/reset?token=" + user.getResetToken());

            sendEmail(passwordResetEmail);

            // Add success message to view
            return "A password reset link has been sent to " + userEmail;
        }

    }

    // Display form to reset password
    @GetMapping(path = "/reset")
    public @ResponseBody
    String displayResetPasswordPage(@RequestParam String token) {

        Optional<User> user = userRepository.findUserByResetToken(token);

        if (user.isPresent()) { // Token found in DB
            return "Token found in DB";
        } else { // Token not found in DB
            return "Oops!  This is an invalid password reset link.";
        }

    }

    // Process reset password form
    @GetMapping(path = "/resetPassword")
    public @ResponseBody
    String setNewPassword(@RequestParam String token, @RequestParam String password) {

        // Find the user associated with the reset token
        Optional<User> user = userRepository.findUserByResetToken(token);

        // This should always be non-null but we check just in case
        if (user.isPresent()) {

            User resetUser = user.get();

            // Set new password
            resetUser.setEncryptedPassword(passwordEncoder.encode(password));

            // Set the reset token to null so it cannot be used again
            resetUser.setResetToken(null);

            // Save user
            userRepository.save(resetUser);

            // In order to set a model attribute on a redirect, we must use
            // RedirectAttributes
            return "You have successfully reset your password.  You may now login.";

        } else {
            return "Oops!  This is an invalid password reset link.";

        }

    }

    //Change Username
    @GetMapping(path = "/changeUsername")
    public @ResponseBody
    String changeUsername(@RequestParam String username, @RequestParam String newUsername) {

        Optional<User> user = userRepository.findUserByName(username);

        if (user.isPresent()) {

            User resetUser = user.get();

            resetUser.setName(newUsername);

            userRepository.save(resetUser);

            return "Username changed";
        } else {
            return "Oops!";

        }
    }

    //save points in the Datenbank

    @GetMapping(path = "/savePoints")
    public @ResponseBody
    String savePoints(@RequestParam String email,@RequestParam int points) {

        Optional<User> userOptional = userRepository.findUserByEmail(email);

       if(userOptional.isPresent()){
           User user = userOptional.get();
           user.setPoints(points);
           userRepository.save(user);
           return user.getName()+ " " +"has" + " "+ points  +" "+ " points.";
       }

       return " can't save points";
    }


    //Change Email

    @GetMapping(path = "/changeEmail")
    public @ResponseBody
    String changeEmailadress(@RequestParam String email, @RequestParam String newEmail) {

        Optional<User> user = userRepository.findUserByEmail(email);

        if (user.isPresent()) {

            User resetUser = user.get();

            resetUser.setEmail(newEmail);

            userRepository.save(resetUser);

            return "E-Mail adress changed";
        } else {
            return "Oops!";

        }
    }


    @GetMapping(path = "/registration") // Map ONLY GET Requests
    public @ResponseBody
    String addNewUser(@RequestParam String name
            , @RequestParam String email, @RequestParam String password) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setEncryptedPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        return "Saved";
    }


    @GetMapping(path = "/findByUsername")
    public @ResponseBody
    boolean findUserByUsername(@RequestParam String username, @RequestParam String password) {
        // This returns a JSON or XML with the users
        List<User> list = userRepository.findAll();
        for (User user : list) {
            if (user.getName().equals(username) && passwordEncoder.matches(password, user.getEncryptedPassword())) {
                return true;
            }
        }

        return false;
    }

    @GetMapping(path = "/findByEmail")
    public @ResponseBody
    boolean findUserByEmail(@RequestParam String email, @RequestParam String password) {
        // This returns a JSON or XML with the users
        List<User> list = userRepository.findAll();
        for (User user : list) {
            if (user.getEmail().equals(email) && passwordEncoder.matches(password, user.getEncryptedPassword())) {
                return true;
            }
        }

        return false;
    }


    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }

    @GetMapping(path = "/subjects")
    public @ResponseBody
    Iterable<Subject> showAllSubjects() {
        return subjectRepository.findAll();
    }

    @GetMapping(path = "/addSubject") // Map ONLY GET Requests
    public @ResponseBody
    String addNewSubject(@RequestParam String name) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        Subject s = new Subject();
        s.setName(name);
        subjectRepository.save(s);
        return "the Subject has been Saved";
    }

    @GetMapping(path = "/sortingProcess")
    public @ResponseBody
    Iterable<SortingProcess> showAllSortingProcesses() {
        return sortingProcessRepository.findAll();
    }

    @GetMapping(path = "/addSortingProcess") // Map ONLY GET Requests
    public @ResponseBody
    String addNewSortingProcess(@RequestParam String name) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        SortingProcess process = new SortingProcess();
        process.setName(name);
        sortingProcessRepository.save(process);
        return "the sorting process has been Saved";
    }

    //RandomArray with differents numbers
    @GetMapping(path = "/randomArrayNumbers")
    public @ResponseBody
    HashSet<Integer> randomArrayNumbers() {
        /*Random r = new Random();
        int low = 0;
        int high = 100;

        array = new int[9];
        for (int i = 0; i < array.length; i++) {
            int result = r.nextInt(high - low) + low;

            array[i] = result;
        }
*/
        int low = 0;
        int high = 100;

        HashSet<Integer> set = new HashSet<Integer>();
        Random random = new Random();

        while (set.size() < 9) {
            int thisOne = random.nextInt(high - low) + low;
            set.add(thisOne);


        }
        return set;
    }

    @GetMapping("/logout")
    public String getLogoutPage(HttpServletRequest request, HttpServletResponse response) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null)
            new SecurityContextLogoutHandler().logout(request, response, authentication);

        return "redirect:/loginPage";
    }

    // Sortierverfahren
    @GetMapping("/bubbleSort")
    public @ResponseBody
    int[] bubbleSort() {
        int[] myArray = array;
        int temp;
        for (int i = 0; i < myArray.length - 1; i++) {

            for (int j = 1; j < myArray.length - i; j++) {
                if (myArray[j - 1] > myArray[j]) {
                    temp = myArray[j - 1];
                    myArray[j - 1] = myArray[j];
                    myArray[j] = temp;
                }
            }

        }
        return myArray;


    }


    //Erste Aufgabe
    @GetMapping("/prinzipien")
    public @ResponseBody
    String[] prinzipien() {

        String anweisung = "Ordnen Sie die folgenden Prinzipien zu der korrespondierenden Definition";
        String[] erste = new String[2];
        String[] zweite = new String[2];
        String[] dritte = new String[2];
        String[] vierte = new String[2];
        String[] fuenfte = new String[2];


        // Strukturierung
        String ersteSatz = "bedeutet, für ein komplexes System eine reduzierte Darstellung zu finden, "
                + "die den Charakter des Ganzen mit seinen spezifischen Merkmalen wiedergibt.";
        erste[0] = "Strukturierung ";
        erste[1] = ersteSatz;

        // Abstraktion
        String zweiteSatz = "bedeutet die Verringerung der Komplexität durch Vernachlässigung von "
                + "Nebenaspekten und Details.";
        zweite[0] = "Abstraktion ";
        zweite[1] = zweiteSatz;

        // Standardisierung

        String dritteSatz = "erfolgt durch die Anwendung von Richtlinien, Normen, Guidelines, etc. und "
                + "betrifft die unterschiedlichsten Bereiche.";
        dritte[0] = "Standardisierung ";
        dritte[1] = dritteSatz;

        // Modularisierung
        String vierteSatz = " bedeutet, ein Softwareprodukt aus einzelnen Bausteinen "
                + "zusammenzusetzen, welche bestimmte Eigenschaften besitzen.";

        vierte[0] = "Modularisierung ";
        vierte[1] = vierteSatz;

        // Geheimnisprinzip

        String fuenfteSatz = "bedeutet, dass es für den Benutzer einer funktionalen Abstraktion "
                + "oder einer Datenabstraktion nicht ersichtlich ist, welche implementierungsabhängigen Internas verwandt worden sind.";

        fuenfte[0] = "Geheimnisprinzip ";
        fuenfte[1] = fuenfteSatz;
        String string = anweisung + erste[0] + erste[1] + zweite[0] + zweite[1]
                + dritte[0] + dritte[1] + vierte[0] + vierte[1] + fuenfte[0] + fuenfte[1];

        String[] aufgabe = new String[]{string};

        return aufgabe;
    }

}
